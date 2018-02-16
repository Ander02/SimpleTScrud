import { Router } from 'express';
import Message from '../models/Message';
import MessageController from "../controllers/MessageController"

export class MessageRouter {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes() {
		this.router.get('/', MessageController.findAll);
		this.router.get('/:id', MessageController.findById);
		this.router.post('/', MessageController.create);
		this.router.put('/:id', MessageController.update);
		this.router.delete('/:id', MessageController.delete);
	}
}

const messageRouter = new MessageRouter();
messageRouter.routes();

export default messageRouter;