import { Controller } from "interfaces/controller";
import toDoService from "services/todo"
import { Router, Request, Response, NextFunction } from "express"

class CustomResponse {
  status: "SUCCESS" | "FAIL";
  statusCode: number;
  error?: {
    message: string,
  }
  data?: Record<string, any>

  constructor() {
    this.status = "SUCCESS"
    this.statusCode = 200
  }
}

class ToDoController implements Controller {
  public path = "/to-do/v1"
  public router = Router()
  constructor() { }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    return await toDoService.create(data)
  }

  async retrieve(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    return await toDoService.retrieve(id)
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.query
    return await toDoService.list(userId as string)
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const data = req.body
    return await toDoService.update(id as string, data)
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    return await toDoService.delete(id as string)
  }
}