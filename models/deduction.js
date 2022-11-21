import mongoose from 'mongoose'

const DeductionSchema = new mongoose.Schema({

	name: {
		type: String
	},

	amount: {
		type: Number
	}

}, { timestamps: true })

const Deduction = mongoose.models.Deduction || mongoose.model('Deduction', DeductionSchema)

export default Deduction