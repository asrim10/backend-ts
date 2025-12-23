export class HttpError extends Error {
  statusCOde: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCOde = statusCode;
  }
}

//custom error to handle http errors with status codes
