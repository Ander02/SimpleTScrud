import { ObjectId } from "bson";

export default class MessageViewer {

	constructor(message) {
		this.id = message.id;
		this.subject = message.subject;
		this.content = message.content;
		this.date = message.date;
	}

	public id: ObjectId;
	public subject: String;
	public content: String;
	public date: Date
}