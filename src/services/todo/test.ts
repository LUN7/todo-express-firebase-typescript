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
  let createdToDoId: string
  let createdToDoCreatedTime: string
  it('should create todo', async () => {
    const createdToDo = await ToDoService.create(SAMPLE_TODO)
    expect(createdToDo.name).toBe(SAMPLE_TODO.name)
    expect(createdToDo.deadline).toBe(SAMPLE_TODO.deadline)
    expect(createdToDo.userId).toBe(SAMPLE_TODO.userId)
    expect(createdToDo.id).toBeDefined()
    expect(createdToDo.created).toBeDefined()
    createdToDoId = createdToDo.id
    createdToDoCreatedTime = createdToDo.created
  })

  it('should retrieve created todo', async () => {
    expect(createdToDoId).toBeDefined()
    const existingToDo = await ToDoService.retrieve(createdToDoId)
    expect(existingToDo).toEqual({
      ...SAMPLE_TODO,
      id: createdToDoId,
      created: createdToDoCreatedTime
    })
  })

  it('should update created todo', async () => {
    expect(createdToDoId).toBeDefined()
    const updatedToDo = await ToDoService.update(createdToDoId, { UPDATE_TODO_DATA })
    expect(updatedToDo).toEqual({
      ...UPDATED_TODO,
      id: createdToDoId,
      created: createdToDoCreatedTime
    })
  })

  it('should list all todo', async () => {
    const toDoList = await ToDoService.list(TEST_USER_ID)
    expect(Array.isArray(toDoList)).toBeTruthy()
  })

  it('should delete created todo', async () => {
    expect(createdToDoId).toBeDefined()
    const deletedToDo = await ToDoService.delete(createdToDoId)
    expect(deletedToDo).toEqual({
      ...SAMPLE_TODO,
      id: createdToDoId,
      created: createdToDoCreatedTime
    })
  })
})