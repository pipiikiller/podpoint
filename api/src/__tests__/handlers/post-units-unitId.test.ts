import { describe, expect, test } from "@jest/globals";
import startHandler from "../../handlers/post-units-unitId";

const unit = {
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
    ],
};

const updatedUnit = {
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
        {
            id: 83838,
            started_at: "2022-07-02T19:46:02.838Z",
            finished_at: null,
        },
    ],
};

jest.mock("../../database/services/UnitService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            get: jest.fn().mockReturnValue(unit),
            create: jest.fn().mockReturnValue(updatedUnit),
        };
    });
});

jest.mock("../../database/services/ChargeService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            create: jest.fn().mockReturnValue({
                id: 83838,
                started_at: "2022-07-02T19:46:02.838Z",
                finished_at: null,
            }),
        };
    });
});

describe("Start Charge handler", () => {
    test("it returns details of a unit", async () => {
        const body = JSON.stringify({
            started_at: "2022-07-02T19:46:02.824Z",
        });
        const event = {
            pathParameters: {
                unitId: 80971,
            },
            body,
        };

        const response = (await startHandler(event)) as { body: string; statusCode: number };

        expect(response.statusCode).toEqual(201);
        expect(JSON.parse(response.body)).toEqual({
            data: updatedUnit,
        });
    });

    test("error return for missing started_at", async () => {
        const body = JSON.stringify({
            finished_at: "2024-07-02T19:46:02.824Z",
        });
        const event = {
            pathParameters: {
                unitId: 80971,
                chargeId: 83838,
            },
            body,
        };

        const response = (await startHandler(event)) as { body: string; statusCode: number };

        expect(response.statusCode).toEqual(422);
        expect(JSON.parse(response.body)).toEqual({
            message: '"started_at" is required',
        });
    });
});
