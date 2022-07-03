/**
 * Retrieve query params from the event object
 * @param event Event object
 */
export const getQueryParams = (event: any): any => {
    return event.queryStringParameters;
};

/**
 * Retrieve path params from the event object
 * @param event Event object
 */
export const getPathParams = (event: any): any => {
    return event.pathParameters;
};

/**
 * Retrieve body from the event object/request
 * @param event Event object
 */
export const getBody = (event: any): any => {
    return event.body;
};
