import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({

	username: {
		type: String
	},

	password: {
		type: String
	},

	isAdmin: {
		type: Boolean,
		default: false
	}
	
}, { timestamps: true })

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema)

export default Account