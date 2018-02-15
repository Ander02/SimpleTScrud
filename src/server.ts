import * as express from "express"
import * as mongoose from "mongoose"
import * as bodyParser from "body-parser"
import * as compression from "compression"
import * as morgan from "morgan"
import * as helmet from "helmet"
import * as cors from "cors"

//import routers
import MessageRouter from "./routers/MessageRouter";


//Server class
class Server {

	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	public config() {

		//Configurar a conexão
		const MONGO_URI = "mongodb://localhost:27017/ts"
		mongoose.connect(MONGO_URI || process.env.MONGO_URI);

		//config
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(bodyParser.json());
		this.app.use(morgan("dev"));
		this.app.use(compression());
		this.app.use(helmet());
		this.app.use(cors());

		// cors
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:8080');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
			res.header('Access-Control-Allow-Credentials', 'true');
			next();
		});
	}

	public routes() {
		const router: express.Router = express.Router();

		this.app.use("/", router);
		this.app.use("/messages", MessageRouter.router);
	}
}

//export
export default new Server().app