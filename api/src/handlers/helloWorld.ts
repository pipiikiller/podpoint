import { APIGatewayProxyResultV2 } from "aws-lambda";

// * List all units
// * Get the details for one particular unit
// * Start a charge on a particular unit while changing its status to "Charging"
// * Stop a charge on a particular unit while changing its status to "Available"
const helloWorldHandler = async (): Promise<APIGatewayProxyResultV2> => {
    const body = JSON.stringify({
        hello: "world!",
    });

    return {
        statusCode: 200,
        body,
        headers: {
            "Content-Type": "application/json",
        },
    };
};

export default helloWorldHandler;
