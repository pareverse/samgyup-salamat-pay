import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({

	id: {
		type: String
	},

	username: {
		type: String
	},

	firstname: {
		type: String
	},

	lastname: {
		type: String
	},

	address: {
		type: String
	},

	birthdate: {
		type: String
	},

	contact: {
		type: String
	},

	gender: {
		type: String
	},

	position: {
		type: String
	},

	timein: {
		type: String
	},

	timeout: {
		type: String
	},

	schedule: {
		type: String
	},

	datestart: {
		type: String,
		default: ''
	},

	total_hours: {
		type: Number,
		default: 0
	},

	total_overtime: {
		type: Number,
		default: 0
	},

	joined: {
		type: String
	}
}, { timestamps: true })

const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)

export default Employee