import database from 'sources/database'
import Deduction from 'models/deduction'

export default async (req, res) => {
	await database.connect()

	const { _id } = req.body
	await Deduction.findByIdAndRemove({ _id })

	res.send('success')

	await database.disconnect()
}