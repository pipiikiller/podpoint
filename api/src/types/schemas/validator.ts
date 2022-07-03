import ValidationException from "../../utils/exceptions/ValidationException";

export const validator = (schema, property) => {
    const { error, value } = schema.validate(property);

    const valid = error == null;

    if (valid) {
        return value;
    } else {
        const { message } = error;

        throw new ValidationException(message);
    }
};
