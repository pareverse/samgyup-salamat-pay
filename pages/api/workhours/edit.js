import database from 'sources/database'
import Workhours from 'models/workhours'

export default async (req, res) => {
	await database.connect()

	const { _id, timein, timeout } = req.body
	await Workhours.findOneAndUpdate({ _id: _id }, { timein: timein, timeout: timeout })

	res.send('success')

	await database.disconnect()
}