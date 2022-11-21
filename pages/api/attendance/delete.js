import database from 'sources/database'
import Attendance from 'models/attendance'

export default async (req, res) => {
	await database.connect()

	const { _id } = req.body
	await Attendance.findOneAndRemove({ _id })

	res.send('success')

	await database.disconnect()
}