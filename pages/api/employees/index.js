import database from 'sources/database'
import Employee from 'models/employee'

export default async (req, res) => {
	await database.connect()

	const users = await Employee.find().sort({ createdAt: -1 })

	res.status(200).send(users)

	await database.disconnect()
}