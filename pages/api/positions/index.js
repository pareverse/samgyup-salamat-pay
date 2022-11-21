import database from 'sources/database'
import Position from 'models/positions'

export default async (req, res) => {
	await database.connect()

	const position = await Position.find().sort({ createdAt: -1 }).limit(10)

	res.status(200).send(position)

	await database.disconnect()
}