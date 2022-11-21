import database from 'sources/database'
import Deduction from 'models/deduction'

export default async (req, res) => {
	await database.connect()

	const deduction = await Deduction.find().sort({ createdAt: -1 }).limit(10)

	res.status(200).send(deduction)

	await database.disconnect()
}