import database from 'sources/database'
import Workhours from 'models/workhours'

export default async (req, res) => {
	await database.connect()

	const { timein, timeout } = req.body
	const newworkhours = new Workhours({ timein, timeout })

	await newworkhours.save()

	res.send('success')

	await database.disconnect()
}