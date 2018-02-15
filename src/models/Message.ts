import { Schema, model } from 'mongoose';

// tslint:disable object-literal-sort-keys
const MessageSchema: Schema = new Schema({

	subject: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

export default model('Message', MessageSchema);