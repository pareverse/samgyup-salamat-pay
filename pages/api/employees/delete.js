import database from 'sources/database'
import Employee from 'models/employee'
import Account from 'models/accounts'

export default async (req, res) => {
	await database.connect()

	const { username } = req.body
	await Employee.findOneAndRemove({ username })
	await Account.findOneAndRemove({ username })

	res.send('success')

	await database.disconnect()
}