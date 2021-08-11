import * as requestValidator from "./validator"
import * as express from 'express'
describe('validate create request', () => {
  it('should invoke next function if request body is correct', async () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeNull()
  })

  it('should invoke next function with error if userId is absent', async () => {
    const request = {
      body: {
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if userId is not string', async () => {
    const request = {
      body: {
        "userId": 132456,
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if name is not string', async () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": 1234,
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if deadline is absent', async () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
  it('should invoke next function with error if deadline is not timestamp', async () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
        "deadline": "abcdef"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
})

describe('validate update request', () => {
  describe('correct request body', () => {
    it('should invoke next function if name and deadline are provided', async () => {
      const request = {
        params: {
          id: "abc"
        },
        body: {
          "name": "todo-1",
          "deadline": "1628633684996"
        }
      } as unknown as express.Request
      const mockNextFunction = jest.fn();
      const mockResponse = {} as unknown as express.Response
      await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
      expect(mockNextFunction.mock.calls.length).toBe(1)
      expect(mockNextFunction.mock.calls[0][0]).toBeNull()
    })
    it('should invoke next function if only name is provided', async () => {
      const request = {
        params: {
          id: "abc"
        },
        body: {
          "name": "todo-1",
        }
      } as unknown as express.Request
      const mockNextFunction = jest.fn();
      const mockResponse = {} as unknown as express.Response
      await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
      expect(mockNextFunction.mock.calls.length).toBe(1)
      expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
    })
    it('should invoke next function if only name is provided', async () => {
      const request = {
        params: {
          id: "abc"
        },
        body: {
          "name": "1628633684996"
        }
      } as unknown as express.Request
      const mockNextFunction = jest.fn();
      const mockResponse = {} as unknown as express.Response
      await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
      expect(mockNextFunction.mock.calls.length).toBe(1)
      expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
    })
  })
  it('should invoke next function with error if userId is provided', async () => {
    const request = {
      params: {
        id: "abc"
      },
      body: {
        "userId": "lun1e89234798"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if name is not string', async () => {
    const request = {
      params: {
        id: "abc"
      },
      body: {
        "userId": "lun1e89234798"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if deadline is not timestamp', async () => {
    const request = {
      params: {
        id: "abc"
      },
      body: {
        "userId": "lun1e89234798"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    await requestValidator.validateUpdate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
})

describe('validate retrieve request', () => {
  it('should invoke next function if id is provided', () => {
    const request = {
      params: {
        id: "asdsa"
      }
    } as unknown as express.Request
    const mockResponse = {} as unknown as express.Response
    const mockNextFunction = jest.fn();
    await requestValidator.validateRetireve(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeNull()
  })
  it('should invoke next function with error if id is not provided', () => {
    const request = {
      params: {
        id: "asdsa"
      }
    } as unknown as express.Request
    const mockResponse = {} as unknown as express.Response
    const mockNextFunction = jest.fn();
    requestValidator.validateRetireve(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
}
)
// describe('validate list request', () => {
//   it('should not throw error if request body is correct', () => {
//     requestValidator.validateCreate()
//   })
// })
// describe('validate delete request', () => {
//   it('should not throw error if request body is correct', () => {
//     requestValidator.validateCreate()
//   })
// })
