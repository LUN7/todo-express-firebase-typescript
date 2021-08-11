import * as requestValidator from "./validator"
import * as express from 'express'
describe('validate create request', () => {
  it('should invoke next function if request body is correct', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeUndefined()
  })

  it('should invoke next function with error if userId is absent', () => {
    const request = {
      body: {
        "name": "todo-1",
        "deadline": "1628633684996"
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
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
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
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
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })

  it('should invoke next function with error if deadline is absent', () => {
    const request = {
      body: {
        "userId": "lun123",
        "name": "todo-1",
      }
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
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
    } as unknown as express.Request
    const mockNextFunction = jest.fn();
    const mockResponse = {} as unknown as express.Response
    requestValidator.validateCreate(request, mockResponse, mockNextFunction)
    expect(mockNextFunction.mock.calls.length).toBe(1)
    expect(mockNextFunction.mock.calls[0][0]).toBeDefined()
  })
})

// describe('validate update request', () => {
//   it('should not throw error if request body is correct', () => {
//     requestValidator.validateCreate()
//   })
// })
// describe('validate retrieve request', () => {
//   it('should not throw error if request body is correct', () => {
//     requestValidator.validateCreate()
//   })
// })
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
