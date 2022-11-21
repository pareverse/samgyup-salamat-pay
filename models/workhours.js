import mongoose from 'mongoose'

const WorkhoursSchema = new mongoose.Schema({

	timein: {
		type: String
	},

	timeout: {
		type: String
	}

}, { timestamps: true })

const Workhours = mongoose.models.Workhours || mongoose.model('Workhours', WorkhoursSchema)

export default Workhours