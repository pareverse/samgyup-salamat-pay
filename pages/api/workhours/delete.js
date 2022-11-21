import database from 'sources/database'
import Workhours from 'models/workhours'

export default async (req, res) => {
	await database.connect()

	const { _id } = req.body
	await Workhours.findByIdAndRemove({ _id })

	res.send('success')

	await database.disconnect()
}