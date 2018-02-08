import * as express from "express"
import * as mongoose from "mongoose"
import * as bodyParser from "body-parser"
import * as compression from "compression"
import * as morgan from "morgan"
import * as helmet from "helmet"
import * as cors from "cors"

//import routers

//Server class
class Server{

	public app : express.Application;

	constructor(){
		this.app = express();
		this.config();
		this.routes();
	}

	public config(){

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
	}

	public routes(){
		let router: express.Router;
		router = express.router();

		this.app.use("/", router);

	}
}

export default new Server().app