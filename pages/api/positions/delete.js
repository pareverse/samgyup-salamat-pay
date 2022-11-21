import database from 'sources/database'
import Position from 'models/positions'

export default async (req, res) => {
	await database.connect()

	const { _id } = req.body
	await Position.findByIdAndRemove({ _id })

	res.send('success')

	await database.disconnect()
}