import mongoose from 'mongoose'

const connection = {}

const connect = async () => {
	if ( connection.isConnected ) {
		// ALREADY CONNECTED TO DATABASE.
		return
	}

	if ( mongoose.connections.length > 0 ) {
		connection.isConnected = mongoose.connections[0].readyState

		if ( connection.isConnected === 1 ) {
			// USE PREVIOUS DATABASE CONNECTION.
			return
		}

		await mongoose.disconnect()
	}

	const database = await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	// NEW CONNECTION TO MONGO DATABASE.
	connection.isConnected = database.connections[0].readyState
}

const disconnect = async () => {
	if ( connection.isConnected ) {
		if ( process.env.NODE_ENV === 'production' ) {
			await mongoose.disconnect()
			// DISCONNECTED TO DATABASE.
			connection.isConnected = false
		} else {
			// NOT DISCONNECTED TO DATABASE.
		}
	}
}

const database = { connect, disconnect }

export default database