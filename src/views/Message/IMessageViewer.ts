import { ObjectId } from "mongodb";

export default interface IMessageViewer {
	id: ObjectId;
	subject: String;
	content: String;
	date?: Date;
}