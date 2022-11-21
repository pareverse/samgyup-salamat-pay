import mongoose from 'mongoose'

const PayrollSchema = new mongoose.Schema({

	date: {
		type: String
	},

	id: {
		type: String
	},

	username: {
		type: String
	},

	fullname: {
		type: String
	},

	position: {
		type: String
	},

	rate: {
		type: Number
	},

	hours: {
		type: Number
	},

	overtime: {
		type: Number
	},

	gross: {
		type: Number
	},

	deduction: {
		type: Number
	},

	netpay: {
		type: Number
	},
	
}, { timestamps: true })

const Payroll = mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema)

export default Payroll