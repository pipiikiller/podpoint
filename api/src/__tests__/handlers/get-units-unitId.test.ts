import { test, describe, expect } from "@jest/globals";
import UnitService from "../../database/services/UnitService";
import getUnitHandler from "../../handlers/get-units-unitId";

const response = {
    id: 80971,
    name: "Connelly Group",
    address: "Legros Fields",
    postcode: "67692",
    status: "charging",
    charges: [
        {
            id: 94955,
            started_at: "2022-07-02T19:46:02.838Z",
            finished_at: "2022-07-02T19:46:02.838Z",
        },
    ],
};
jest.mock("../../database/services/UnitService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            get: jest.fn().mockReturnValue(response),
        };
    });
});

describe("Get Unit handler", () => {
    test("it returns details of a unit", async () => {
        const unitService = new UnitService();
        const unit = unitService.get(80971);

        const event = {
            pathParameters: {
                unitId: 80971,
            },
        };

        const response = (await getUnitHandler(event)) as { body: string; statusCode: number };

        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual({
            unit,
        });
    });
});
