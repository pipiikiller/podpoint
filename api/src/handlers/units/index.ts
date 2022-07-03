import { APIGatewayProxyResultV2 } from "aws-lambda";
import UnitService from "../../database/services/UnitService";

// * List all units
// operationId: units.index

const listAllHandler = async (event: any): Promise<APIGatewayProxyResultV2> => {
    const unitService = new UnitService();

    const units = await unitService.listAll();

    const body = JSON.stringify({
        units,
    });

    return {
        statusCode: 200,
        body,
        headers: {
            "Content-Type": "application/json",
        },
    };
};

export default listAllHandler;
