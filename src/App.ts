import * as express from "express"
import * as controller from "interfaces/controller";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";

const corsConfig: cors.CorsOptions = {
  origin: [
    "*",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

enum ServerStatus {
  Initialization = "initialization",
  Ready = "ready",
  Error = "error",
}

export default class App {
  public app: express.Application;
  public status: ServerStatus;
  private controllers: controller.Controller[]

  constructor(controllers: controller.Controller[]) {
    this.status = ServerStatus.Initialization;
    this.app = express();
    this.controllers = controllers
  }

  public async initialize() {
    this.initializeMiddlewares();
    this.initializeControllers(this.controllers);
    this.initializeErrorHandling();
    return this.listen()
  }

  private listen(port = process.env.PORT || 3000) {
    this.app.on("error", (err) => {
      console.error(`App fail ${port}`);
      this.status = ServerStatus.Error;
    });
    return this.app.listen(port, () => {
      console.info(`App listening on the port ${port}`);
      this.status = ServerStatus.Ready;
    });
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', 1);
    this.app.use(helmet());
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan("combined")
    );
  }

  private initializeErrorHandling() {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        for (const controller of this.controllers) {
          if (req.url.startsWith(controller.path)) {
            controller.errorHandler(err, req, res, next)
          }
        }
      } catch (err) {
        console.error('unhandled error', err)
        res.send(400)
      }
    })
  }

  private initializeControllers(controllers: controller.Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
}

