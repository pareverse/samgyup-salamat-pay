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

	if ( !user ) return res.status(400).send({ usernameError: 'Email address does not exist.' })

	if ( check !== null ) {
		if ( check.att_timeout === '' ) {
			
			let emp_timeout = Number(check.emp_timeout.slice(0, 2))
			let att_timein = Number(check.att_timein.slice(0, 2))
			let att_timeout = Number(time.slice(0, 2))
			let employee_current_hours = employee.total_hours
			let employee_current_overtime = employee.total_overtime
			let hours = 0
			let overtime = 0

			// GET EMPLOYEE OVERTIME LOGIC

			if ( emp_timeout > 12 && att_timeout > 12 ) {
				if ( ( 12 - emp_timeout ) <= ( 12 - att_timeout ) ) {
					overtime = 0
				} else {
					overtime = ( ( 12 - emp_timeout ) - ( 12 - att_timeout ) )
				}
			} else if ( emp_timeout <= 12 && att_timeout <= 12 ) {
				if ( emp_timeout >= att_timeout ) {
					overtime = 0
				} else {
					overtime = ( att_timeout - emp_timeout )
				}
			} else if ( emp_timeout > 12 && att_timeout <= 12 ) {
				if ( (12 - emp_timeout) <= (12 - att_timeout) ) {
					overtime = 0
				} else {
					overtime = ((12 - emp_timeout) - (12 - att_timeout))
				}
			} else if ( emp_timeout <= 12 && att_timeout > 12 ) {
				if ( (12 - emp_timeout) >= (12 - att_timeout) ) {
					overtime = 0
				} else {
					overtime = ((12 - emp_timeout) - (12 - att_timeout))
				}
			}

			// GET EMPLOYEE WORKHOURS LOGIC

			if ( att_timein > 12 && att_timeout > 12 ) {
				att_timein -= 12
				att_timeout -= 12
				hours = ((12 - att_timein) - (12 - att_timeout))
			}else if ( att_timein <= 12 && att_timeout <= 12 ) {
				hours = ( att_timeout - att_timein )
			}else if ( att_timein > 12 && att_timeout <= 12 ) {
				att_timein -= 12
				hours = ((12 - att_timein) + att_timeout)
			}else if ( att_timein <= 12 && att_timeout > 12 ) {
				att_timeout -= 12
				hours = (att_timeout + (12 - att_timein))
			}

			let total_hours = (employee_current_hours + hours)
			let total_overtime = (employee_current_overtime + overtime)

			await Attendance.findOneAndUpdate({ _id: check._id }, { att_timeout: time, overtime: overtime, total: hours })
			await Employee.findOneAndUpdate({ username: username }, { total_hours: total_hours, total_overtime: overtime })
			
			res.send('success')

		} else {
			return res.status(400).send({ dateError: 'You already time out.' })
		}
	} else {
		return res.status(400).send({ dateError: 'Please time in first.' })
	}

	await database.disconnect()
}