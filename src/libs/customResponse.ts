import * as express from "express"

export class SuccessResponse {
  status = "success";
  data: Record<string, any>;
  statusCode: number;
  private res: express.Response

  constructor(
    res: express.Response,
    data: SuccessResponse["data"],
    { statusCode }: { statusCode?: SuccessResponse["statusCode"] } = {}
  ) {
    this.res = res;
    this.data = data;
    this.statusCode = statusCode || 200;
  }

  toJson() {
    return {
      status: this.status,
      data: this.data,
    }
  }

  send() {
    this.res.status(this.statusCode).send(this.toJson())
  }
}

export class FailResponse {
  status = "fail";
  err: Record<string, any>
  statusCode: number;
  private res: express.Response

  constructor(
    res: express.Response,
    err: FailResponse["err"],
    { statusCode }: { statusCode?: SuccessResponse["statusCode"] } = {}
  ) {
    this.res = res;
    this.err = err;
    this.statusCode = statusCode || 200;
  }

  toJson() {
    return {
      status: this.status,
      err: this.err,
    }
  }

  send() {
    this.res.status(this.statusCode).send(this.toJson())
  }
}

