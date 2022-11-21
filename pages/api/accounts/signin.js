import database from 'sources/database'
import Account from 'models/accounts'

export default async (req, res) => {
	await database.connect()

	const { username, password } = req.body
	const user = await Account.findOne({ username })

	if ( !user ) return res.status(400).send({ usernameError: 'Username does not exist.' })
	if ( user.password !== password ) return res.status(400).send({ passwordError: 'Wrong password.' })

	res.send({
		_id: user._id,
		username: user.username,
		isAdmin: user.isAdmin
	})

	await database.disconnect()
}