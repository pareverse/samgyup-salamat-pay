import database from 'sources/database'
import Attendance from 'models/attendance'

export default async (req, res) => {
	await database.connect()

	const users = await Attendance.find().sort({ createdAt: -1 }).limit(10)

	res.status(200).send(users)

	await database.disconnect()
}