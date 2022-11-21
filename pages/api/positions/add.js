import database from 'sources/database'
import Position from 'models/positions'

export default async (req, res) => {
	await database.connect()

	const { position, rate } = req.body
	const newposition = new Position({ position, rate })

	await newposition.save()

	res.send('success')

	await database.disconnect()
}