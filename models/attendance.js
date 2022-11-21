import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({

	date: {
		type: String
	},

	username: {
		type: String
	},

	emp_timein: {
		type: String,
		default: ''
	},

	emp_timeout: {
		type: String,
		default: ''
	},

	att_timein: {
		type: String,
		default: ''
	},

	att_timeout: {
		type: String,
		default: ''
	},

	late: {
		type: Number,
		default: 0
	},

	overtime: {
		type: Number,
		default: 0
	},

	total: {
		type: Number,
		default: 0
	}

}, { timestamps: true })

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema)

export default Attendance