import * as ToDoService from './todo'

const TEST_USER_ID = "test-1212"
const NOW = Date.now()
const UPDATED_NOW = Date.now()

const SAMPLE_TODO = {
  userId: TEST_USER_ID,
  name: "TODO-1",
  deadline: NOW,
}

const UPDATE_TODO_DATA = {
  name: "TODO-2",
  deadline: UPDATED_NOW,
}

const UPDATED_TODO = {
  userId: TEST_USER_ID,
  name: "TODO-2",
  deadline: UPDATED_NOW,
}

describe('ToDo Service', () => {
  let createdTodoId: string
  it('should create todo', async () => {
    const createdToDo = await ToDoService.create(SAMPLE_TODO)
    expect(createdToDo.name).toBe(SAMPLE_TODO.name)
    expect(createdToDo.deadline).toBe(SAMPLE_TODO.deadline)
    expect(createdToDo.userId).toBe(SAMPLE_TODO.userId)
    expect(createdToDo.id).toBeDefined()
    createdTodoId = createdToDo.id
  })

  it('should retrieve created todo', async () => {
    expect(createdTodoId).toBeDefined()
    const existingToDo = await ToDoService.retrieve(createdTodoId)
    expect(existingToDo).toEqual({
      ...SAMPLE_TODO,
      id: createdTodoId
    })
  })

  it('should update created todo', async () => {
    expect(createdTodoId).toBeDefined()
    const updatedToDo = await ToDoService.update(createdTodoId, { UPDATE_TODO_DATA })
    expect(updatedToDo).toEqual({
      UPDATED_TODO
    })
  })

  it('should list all todo', async () => {
    const toDoList = await ToDoService.list(TEST_USER_ID)
    expect(Array.isArray(toDoList)).toBeTruthy()
  })

  it('should delete created todo', async () => {
    expect(createdTodoId).toBeDefined()
    const deletedToDo = await ToDoService.delete(createdTodoId)
    expect(deletedToDo).toEqual({
      ...SAMPLE_TODO,
      id: createdTodoId
    })
  })
})