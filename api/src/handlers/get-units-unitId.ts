import { APIGatewayProxyResultV2 } from "aws-lambda";
import UnitService from "../database/services/UnitService";
import next from "../utils/exceptions/Next";
import { getPathParams } from "../utils/utilities";

// * Get the details for one particular unit

const getUnitHandler = async (event: any): Promise<APIGatewayProxyResultV2> => {
    const pathParameters = getPathParams(event);
    const { unitId } = pathParameters;

    try {
        const unitService = new UnitService();
        const unit = await unitService.get(unitId);

        const body = JSON.stringify({
            unit,
        });

        return {
            statusCode: 200,
            body,
            headers: {
                "Content-Type": "application/json",
            },
        };
    } catch (error) {
        return next(error);
    }
};

export default getUnitHandler;
