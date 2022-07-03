import HttpException from "./HttpException";

export class DatabaseException extends HttpException {
    constructor(message: string) {
        super(404, message);
    }
}

export default DatabaseException;
