import database from 'sources/database'
import Deduction from 'models/deduction'

export default async (req, res) => {
	await database.connect()

	const { _id, name, amount } = req.body
	await Deduction.findOneAndUpdate({ _id: _id }, { name: name, amount: amount })

	res.send('success')

	await database.disconnect()
}