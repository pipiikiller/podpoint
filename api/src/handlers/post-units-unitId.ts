import { APIGatewayProxyResultV2 } from "aws-lambda";
import ChargeService from "../database/services/ChargeService";
import UnitService from "../database/services/UnitService";
import { UnitStatus } from "../types/entities/Unit";
import { startRequestSchema } from "../types/schemas/requestBodySchema";
import { validator } from "../types/schemas/validator";
import HttpException from "../utils/exceptions/HttpException";
import next from "../utils/exceptions/Next";
import NotAvailableException from "../utils/exceptions/NotAvailableException";
import { getBody, getPathParams } from "../utils/utilities";

// * Start a charge on a particular unit while changing its status to "Charging"

const startHandler = async (event: any): Promise<APIGatewayProxyResultV2> => {
    const pathParams = getPathParams(event);
    const requestBody = JSON.parse(getBody(event));
    try {
        const validatedBody = validator(startRequestSchema, requestBody);

        const { unitId } = pathParams;
        const { started_at } = validatedBody;

        const chargeService = new ChargeService();
        const unitService = new UnitService();

        const unit = await unitService.get(unitId);

        if (unit && unit.status == UnitStatus.CHARGING) {
            throw new NotAvailableException("Charge is not available.");
        }

        const charge = await chargeService.create({
            started_at,
        });

        unit.status = UnitStatus.CHARGING;
        unit.charges?.push(charge);

        await unitService.create(unit);

        const body = JSON.stringify({
            data: unit,
        });

        return {
            statusCode: 201,
            body,
            headers: {
                "Content-Type": "application/json",
                "X-Entity-ID": charge.id,
            },
        };
    } catch (error) {
        return next(error);
    }
};

export default startHandler;
