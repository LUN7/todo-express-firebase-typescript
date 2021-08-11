import toDoService from './toDo'

const TEST_USER_ID = "test-1212"
const NOW = String(Date.now())
const UPDATED_NOW = String(Date.now())

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
  let createdToDoId: string;
  let createdToDoCreatedTime: string;
  it('should create todo', async () => {
    const createdToDo = await toDoService.create(SAMPLE_TODO)
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
    const existingToDo = await toDoService.retrieve(createdToDoId)
    expect(existingToDo).toEqual({
      ...SAMPLE_TODO,
      id: createdToDoId,
      created: createdToDoCreatedTime
    })
  })

  it('should update created todo', async () => {
    expect(createdToDoId).toBeDefined()
    const updatedToDo = await toDoService.update(createdToDoId, { ...UPDATE_TODO_DATA })
    expect(updatedToDo).toEqual({
      ...UPDATED_TODO,
      id: createdToDoId,
      created: createdToDoCreatedTime
    })
  })

  it('should list all todo', async () => {
    const toDoList = await toDoService.list(TEST_USER_ID)
    expect(Array.isArray(toDoList)).toBeTruthy()
  })

  it('should delete created todo', async () => {
    expect(createdToDoId).toBeDefined()
    return await toDoService.delete(createdToDoId)
  })
})