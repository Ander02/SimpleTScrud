import { ObjectId } from "bson";
import IMessageViewer from "./IMessageViewer";

export default class MessageViewer implements IMessageViewer {

	public id: ObjectId;
	public subject: String;
	public content: String;
	public date?: Date

	constructor({ id, subject, content, date }) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.date = date;
	}
}
