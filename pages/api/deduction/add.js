import database from 'sources/database'
import Deduction from 'models/deduction'

export default async (req, res) => {
	await database.connect()

	const { name, amount } = req.body
	const newdeduction = new Deduction({ name, amount })

	await newdeduction.save()

	res.send('success')

	await database.disconnect()
}