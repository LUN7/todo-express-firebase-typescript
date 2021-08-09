import * as UserServices from './user'

const TEST_CASES = {
  CREATE: {
    INPUT: {
      name: "Alan"
    },
    OUTPUT: {
      name: "Alan"
    },
  }
}

describe('User Service', () => {
  let createdUserId: string
  it('should create user', async () => {
    const createdUser = await UserServices.create(TEST_CASES.CREATE.INPUT)
    expect(createdUser.name).toBe(TEST_CASES.CREATE.OUTPUT)
    expect(typeof createdUser.id).toBeDefined()
    createdUserId = createdUser.id
  })

  it('should retrieve created user', async () => {
    expect(createdUserId).toBeDefined()
    const existingUser = await UserServices.retrieve(createdUserId)
    expect(existingUser).toEqual({
      ...TEST_CASES.CREATE.OUTPUT,
      id: createdUserId
    })
  })

  it('should delete created user', async () => {
    expect(createdUserId).toBeDefined()
    const deletedUser = await UserServices.delete(createdUserId)
    expect(deletedUser).toEqual({
      ...TEST_CASES.CREATE.OUTPUT,
      id: createdUserId
    })
  })

})

