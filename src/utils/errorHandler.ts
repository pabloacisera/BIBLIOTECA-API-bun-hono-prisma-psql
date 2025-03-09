export class CustomError extends Error{
  constructor(message: string, public statusCode:number){
    super(message)
    this.name = this.constructor.name
  }
}

export class NotFoundError extends CustomError{
  constructor(message: string = 'Resource not found'){
    super(message, 404)
  }
}

export class BadRequestError extends CustomError{
  constructor(message: string = 'Bad Request'){
    super(message, 400)
  }
}
