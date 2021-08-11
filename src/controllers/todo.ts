import { Controller } from "interfaces/controller";
import toDoService, { NotFoundError } from "services/todo"
import * as express from "express"
import * as requestValidator from "./validator"
import catchException from "libs/expressErrorBoundary"
import * as customResponse from "libs/customResponse"
class ToDoController implements Controller {
  public path = "/to-do/v1"
  public router = express.Router()
  constructor() {
    this.router.get('/:id', requestValidator.validateRetrieve, this.retrieve)
    this.router.delete('/:id', requestValidator.validateDelete, this.delete)
    this.router.post('/:id', requestValidator.validateUpdate, this.update)
    this.router.get('/', requestValidator.validateList, this.list)
    this.router.post('/', requestValidator.validateCreate, this.create)
  }

  @catchException
  public async create(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data = req.body
    const createdToDo = await toDoService.create(data)
    const response = new customResponse.SuccessResponse(res, createdToDo, { statusCode: 201 })
    return response.send()
  }

  @catchException
  public async retrieve(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.params
    const toDo = await toDoService.retrieve(id)
    const response = new customResponse.SuccessResponse(res, toDo, { statusCode: 200 })
    return response.send()
  }

  @catchException
  public async list(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId } = req.query
    const toDos = await toDoService.list(userId as string)
    const response = new customResponse.SuccessResponse(res, toDos, { statusCode: 200 })
    return response.send()
  }

  @catchException
  public async update(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.params
    const data = req.body
    const updatedTodo = await toDoService.update(id as string, data)
    const response = new customResponse.SuccessResponse(res, updatedTodo, { statusCode: 200 })
    return response.send()
  }

  @catchException
  public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.params
    await toDoService.delete(id as string)
    const response = new customResponse.SuccessResponse(res, null, { statusCode: 200 })
    return response.send()
  }

  public errorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof NotFoundError) {
      return res.sendStatus(404)
    }
    if (err instanceof requestValidator.ValidationError) {
      const response = new customResponse.FailResponse(res, err, { statusCode: 400 })
      return response.send()
    }
    throw (err)
  }
}
export default ToDoController