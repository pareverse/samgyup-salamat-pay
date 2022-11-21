import database from 'sources/database'
import Employee from 'models/employee'
import Account from 'models/accounts'

export default async (req, res) => {
	await database.connect()

	const { id, username, firstname, lastname, address, birthdate, contact, gender, position, timein, timeout, schedule, joined } = req.body
	
	const users = await Employee.findOne({ username })

	if ( users ) return res.status(400).send({ usernameError: 'Username is already exist.' })

	const newemployee = new Employee({ id, username, firstname, lastname, address, birthdate, contact, gender, position, timein, timeout, schedule, joined })
	const newaccount = new Account({ username, password: id })

	await newemployee.save()
	await newaccount.save()

	res.send('success')

	await database.disconnect()
}