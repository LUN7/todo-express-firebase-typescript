import * as customResponse from "./customResponse";

function createResponseMock() {
  let _statusCode
  const responseMock = {
    statusCode: _statusCode,
    send: jest.fn(),
    status: (statusCode: number) => {
      _statusCode = statusCode
      return responseMock
    }
  }
  return responseMock
}

describe("success response", () => {
  const res = createResponseMock()
  const data = { name: "123" }
  const statusCode = 200
  const response = new customResponse.SuccessResponse(res as any, data, { statusCode });
  response.send()

  it("should construct properly", () => {
    expect(response.data).toBe(data)
    expect(response.statusCode).toBe(statusCode)

  });


  it("should get the json properly", () => {
    expect(response.toJson()).toEqual({
      status: "success",
      data
    })
  });

  it("should invoke the send properly", () => {
    expect(res.send.mock.calls.length).toBe(1)
  });
});

describe("fail response", () => {
  const res = createResponseMock()
  const err = new Error('test')
  const statusCode = 200
  const response = new customResponse.FailResponse(res as any, err, { statusCode });
  response.send()
  it("should construct properly", () => {
    expect(response.err).toBe(err)
    expect(response.statusCode).toBe(statusCode)
  });

  it("should get the json properly", () => {
    expect(response.toJson()).toEqual({
      status: "fail",
      err
    })
  });

  it("should invoke the send properly", () => {
    expect(res.send.mock.calls.length).toBe(1)
  });
});