import database from 'sources/database'
import Employee from 'models/employee'

export default async (req, res) => {
	await database.connect()

	const { _id, username, firstname, lastname, address, contact, birthdate, gender, position, timein, timeout, schedule } = req.body
	await Employee.findOneAndUpdate({ _id: _id }, { username: username, firstname: firstname, lastname: lastname, address: address, contact: contact, birthdate: birthdate, gender: gender, position: position, timein: timein, timeout: timeout, schedule: schedule })

	res.send('success')

	await database.disconnect()
}