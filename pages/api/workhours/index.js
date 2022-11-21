import database from 'sources/database'
import Workhours from 'models/workhours'

export default async (req, res) => {
	await database.connect()

	const workhours = await Workhours.find().sort({ createdAt: -1 }).limit(10)

	res.status(200).send(workhours)

	await database.disconnect()
}