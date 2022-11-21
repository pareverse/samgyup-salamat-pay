import database from 'sources/database'
import Position from 'models/positions'

export default async (req, res) => {
	await database.connect()

	const { _id, position, rate } = req.body
	await Position.findOneAndUpdate({ _id: _id }, { position: position, rate: rate })

	res.send('success')

	await database.disconnect()
}