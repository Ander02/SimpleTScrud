import { Request, Response } from 'express';
import Message from '../models/Message';
import MessageViewer from '../views/Message/MessageViewer';

export class MessageController {

	constructor() {

	}

	public findAll(req: Request, res: Response): void {

		Message.find().then((data) => {

			let responseData = [];

			data.forEach((item) => {

				responseData.push(new MessageViewer(item));
			});
			res.status(200).json(responseData);

		}).catch((error) => {
			res.status(400).json({ error });
		});
	}

	public findById(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findById(id).then((data) => {

			if (data == null || typeof (data) == "undefined") res.status(404).json();

			else res.status(200).json(new MessageViewer(data));

		}).catch((error) => {
			res.status(400).json({ error });

		});
	}

	public create(req: Request, res: Response): void {

		const subject: string = req.body.subject;
		const content: string = req.body.content;

		//validations
		if (subject == null || subject == "" || typeof (subject) == "undefined") {
			res.status(422).json({ error: 'subject is required' });
		}
		if (content == null || content == "" || typeof (content) == "undefined") {
			res.status(422).json({ error: 'Content is required' });
		}

		const message = new Message({ subject, content });

		message.save().then((data) => {
			res.status(201).json(new MessageViewer(data));

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public update(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findByIdAndUpdate(id, req.body).then((data) => {
			res.status(200).json(new MessageViewer(data));

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public delete(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findByIdAndRemove(id).then(() => {
			res.status(204).end();

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

}

export default new MessageController();