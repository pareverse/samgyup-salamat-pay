import database from 'sources/database'
import Account from 'models/accounts'
import Attendance from 'models/attendance'
import Employee from 'models/employee'

export default async (req, res) => {
	await database.connect()

	const { date, username, time } = req.body
	const user = await Account.findOne({ username })
	const check = await Attendance.findOne({ username, date })
	const employee = await Employee.findOne({ username })

	if ( !user ) return res.status(400).send({ usernameError: 'Employee does not exist.' })
	
	if ( check !== null ) {
		if ( check.att_timein !== '' ) return res.status(400).send({ dateError: 'You already time in today.' })
	} else {

		// GET EMPLOYEE LATE LOGIC

		let emp_time = Number(employee.timein.slice(0, 2))
		let att_time = Number(time.slice(0, 2))
		let late = 0

		if ( emp_time > 12 && att_time > 12 ) {
			if ( (12 - emp_time) <= (12 - att_time) ) {
				late = 0
			} else {
				late = ( att_time - emp_time )
			}
		} else if ( emp_time <= 12 && att_time <= 12 ) {
			if ( emp_time >= att_time ) {
				late = 0
			} else {
				late = ( att_time - emp_time )
			}
		} else if ( emp_time > 12 && att_time <= 12 ) {
			if ( (12 - emp_time) >= att_time ) {
				late = 0
			} else {
				late = ( ( 12 - emp_time ) + (12 + att_time) )
			}
		} else if ( emp_time <= 12 && att_time > 12 ) {
			if ( emp_time <= (12 - att_time) ) {
				late = 0
			} else {
				late = ( att_time - emp_time )
			}
		}

		if ( employee.datestart === '' ) {
			await Employee.findOneAndUpdate({ username: username }, { datestart: date })
		}

		const newattendance = new Attendance({ date, username, emp_timein: employee.timein, emp_timeout: employee.timeout, att_timein: time, late })
		await newattendance.save()

		res.send('success')
	}

	await database.disconnect()
}