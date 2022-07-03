import { ValidationError } from "joi";

import HttpException from "./HttpException";

export class ValidationException extends HttpException {
    constructor(message: string) {
        super(422, message);
    }
}

export default ValidationException;
