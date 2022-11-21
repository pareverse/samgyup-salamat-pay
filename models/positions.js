import mongoose from 'mongoose'

const PositionSchema = new mongoose.Schema({

	position: {
		type: String
	},

	rate: {
		type: String
	}

}, { timestamps: true })

const Position = mongoose.models.Position || mongoose.model('Position', PositionSchema)

export default Position