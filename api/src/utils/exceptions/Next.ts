export default function next(error: any) {
    const { message, status } = error;

    const body = JSON.stringify({
        message,
    });
    return {
        statusCode: status || 500,
        body,
        headers: {
            "Content-Type": "application/json",
        },
    };
}
