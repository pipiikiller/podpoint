import { APIGatewayProxyResultV2 } from "aws-lambda";
import Seed from "../database/seeds/seeds";

// * List all units
// * Get the details for one particular unit
// * Start a charge on a particular unit while changing its status to "Charging"
// * Stop a charge on a particular unit while changing its status to "Available"
const seedHandler = async (): Promise<APIGatewayProxyResultV2> => {
    const body = JSON.stringify({
        seeded: "true!",
    });

    try {
        const seed = new Seed();
        seed.seed();
        return {
            statusCode: 200,
            body,
            headers: {
                "Content-Type": "application/json",
            },
        };
    } catch (error) {
        const errorBody = JSON.stringify({
            seeded: "false!",
            error,
        });
        return {
            statusCode: 500,
            body: errorBody,
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
};

export default seedHandler;
