import * as requestValidator from "./validator"

describe('validate create request', () => {
  it('should invoke next function if request body is correct', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeUndefined()
  })

  it('should invoke next function with error if userId is absent', () => {
    const request = {
      body: {
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if userId is not string', () => {
    const request = {
      body: {
        "userId": 132456,
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if name is not string', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": 1234,
        "deadline": "1628633684996"
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if deadline is absent', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
  it('should invoke next function with error if deadline is not timestamp', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
        "deadline": "abcdef"
      }
    }
    const mockNextFunction = jest.fn();
    const mockResponse = {}
    requestValidator.validateCreate()(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
})

