export enum StatusCodeEnum {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export type HttpResponse<R = unknown> = {
  statusCode: StatusCodeEnum
  data: R
}
