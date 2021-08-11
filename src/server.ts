import { default as App } from "./App"
import { default as ToDoController } from "controllers/todo"

const app = new App([new ToDoController()])
app.initialize().then(async (server) => {
})