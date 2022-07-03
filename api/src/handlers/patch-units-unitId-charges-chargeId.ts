import { APIGatewayProxyResultV2 } from "aws-lambda";
import ChargeService from "../database/services/ChargeService";
import UnitService from "../database/services/UnitService";
import { UnitStatus } from "../types/entities/Unit";
import { stopRequestSchema } from "../types/schemas/requestBodySchema";
import { validator } from "../types/schemas/validator";
import next from "../utils/exceptions/Next";
import { getBody, getPathParams } from "../utils/utilities";

// * Stop a charge on a particular unit while changing its status to "Available"

const stopHandler = async (event: any): Promise<APIGatewayProxyResultV2> => {
    const pathParams = getPathParams(event);
    const requestBody = JSON.parse(getBody(event));

    try {
        const validatedBody = validator(stopRequestSchema, requestBody);

        const { unitId, chargeId } = pathParams;
        const { finished_at } = validatedBody;

        const chargeService = new ChargeService();
        const unitService = new UnitService();

        const charge = await chargeService.get(chargeId);
        charge.finished_at = finished_at;
        await chargeService.update(charge);

        const unit = await unitService.get(unitId);
        unit.status = UnitStatus.AVAILABLE;
        await unitService.update(unit);

        const body = JSON.stringify({
            data: unit,
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

export default stopHandler;
