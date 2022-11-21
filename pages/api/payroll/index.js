import database from 'sources/database'
import Payroll from 'models/payroll'

export default async (req, res) => {
	await database.connect()

	const payroll = await Payroll.find().sort({ createdAt: -1 }).limit(10)

	res.status(200).send(payroll)

	await database.disconnect()
}