import { test, describe, expect } from "@jest/globals";
import UnitService from "../../database/services/UnitService";
import getUnitHandler from "../../handlers/get-units-unitId";
import listAllHandler from "../../handlers/units";

const response = {
    units: [
        {
            id: 80599,
            name: "Erdman and Sons",
            address: "Medhurst Drive",
            postcode: "60176",
            status: "charging",
            charges: [
                {
                    id: 85679,
                    started_at: "2022-07-02T19:46:02.816Z",
                    finished_at: "2022-07-02T19:46:02.816Z",
                },
                {
                    id: 27959,
                    started_at: "2022-07-02T19:46:02.824Z",
                    finished_at: "2022-07-02T19:46:02.824Z",
                },
                {
                    id: 21958,
                    started_at: "2022-07-02T19:46:02.831Z",
                    finished_at: null,
                },
            ],
        },
        {
            id: 80971,
            name: "Connelly Group",
            address: "Legros Fields",
            postcode: "67692",
            status: "available",
            charges: [
                {
                    id: 94955,
                    started_at: "2022-07-02T19:46:02.838Z",
                    finished_at: "2022-07-02T19:46:02.838Z",
                },
                {
                    id: 77760,
                    started_at: "2022-07-02T19:46:02.846Z",
                    finished_at: "2022-07-02T19:46:02.846Z",
                },
            ],
        },
        {
            id: 3998,
            name: "Bednar and Sons",
            address: "Mafalda Overpass",
            postcode: "30981-5532",
            status: "charging",
            charges: [
                {
                    id: 38633,
                    started_at: "2022-07-02T19:46:02.808Z",
                    finished_at: "2022-07-02T19:46:02.808Z",
                },
                {
                    id: 66532,
                    started_at: "2022-07-02T19:46:02.637Z",
                    finished_at: "2024-07-02T19:46:02.637Z",
                },
                {
                    id: 36153,
                    started_at: "2022-08-02T19:46:02.637Z",
                    finished_at: null,
                },
            ],
        },
    ],
};
jest.mock("../../database/services/UnitService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            listAll: jest.fn().mockReturnValue(response),
        };
    });
});

describe("Get Units handler", () => {
    test("it returns list of units", async () => {
        const unitService = new UnitService();
        const units = unitService.listAll();

        const response = (await listAllHandler({})) as { body: string; statusCode: number };

        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual({
            units,
        });
    });
});
