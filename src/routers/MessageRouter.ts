import { Request, Response, Router } from 'express';
import Message from '../models/Message';

export class MessageRouter {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public findAll(req: Request, res: Response): void {

		Message.find().then((data) => {

			res.status(200).json(data);

		}).catch((error) => {

			res.json({ error });

		});
	}

	public findById(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findOne({
			_id: id
		}).then((data) => {

			if (data == null || typeof (data) == "undefined") res.status(404).json();

			else res.status(200).json(data);

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public create(req: Request, res: Response): void {

		const subject: string = req.body.subject;
		const content: string = req.body.content;

		if (subject == null || subject == "" || typeof (subject) == "undefined") {
			res.status(422).json({ error: 'subject is required' });
		}
		if (content == null || content == "" || typeof (content) == "undefined") {
			res.status(422).json({ error: 'Content is required' });
		}

		const message = new Message({ subject, content });

		message.save().then((data) => {
			res.status(201).json(data);

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public update(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findOneAndUpdate({
			_id: id
		}, req.body).then((data) => {
			res.status(200).json(data);

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public delete(req: Request, res: Response): void {
		const id: string = req.params.id;

		Message.findOneAndRemove({
			_id: id
		}).then(() => {
			res.status(204).end();

		}).catch((error) => {
			res.status(500).json({ error });

		});
	}

	public routes() {
		this.router.get('/', this.findAll);
		this.router.get('/:id', this.findById);
		this.router.post('/', this.create);
		this.router.put('/:id', this.update);
		this.router.delete('/:id', this.delete);
	}

}

const messageRouter = new MessageRouter();
messageRouter.routes();

export default messageRouter;