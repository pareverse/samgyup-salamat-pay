import database from 'sources/database'
import Employee from 'models/employee'
import Payroll from 'models/payroll'

export default async (req, res) => {
	await database.connect()

	const { date, id, username, fullname, position, rate, hours, overtime, gross, deducs, netpay } = req.body
	console.log(deducs)

	const newpayroll = new Payroll({ date, id, username, fullname, position, rate, hours, overtime, gross, deduction: deducs, netpay })
	await Employee.findOneAndUpdate({ username: username }, { datestart: '', total_hours: 0, total_overtime: 0 })
	await newpayroll.save()

	res.send('success')

	await database.disconnect()
}