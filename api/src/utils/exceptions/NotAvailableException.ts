import HttpException from "./HttpException";

export class NotAvailableException extends HttpException {
    constructor(message: string) {
        super(406, message);
    }
}

export default NotAvailableException;
