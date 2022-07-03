export default class ApiError {
  code: number
  message: string

  constructor(code: number, message: string) {
    this.message = message
    this.code = code
  }
}
