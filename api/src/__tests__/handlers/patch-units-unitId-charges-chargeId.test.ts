import { describe, expect, test } from "@jest/globals";
import stopHandler from "../../handlers/patch-units-unitId-charges-chargeId";

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
        {
            id: 83838,
            started_at: "2022-07-02T19:46:02.838Z",
            finished_at: null,
        },
    ],
};

const updatedUnit = {
    id: 80971,
    name: "Connelly Group",
    address: "Legros Fields",
    postcode: "67692",
    status: "available", // change the status
    charges: [
        {
            id: 94955,
            started_at: "2022-07-02T19:46:02.838Z",
            finished_at: "2022-07-02T19:46:02.838Z",
        },
        {
            id: 83838,
            started_at: "2022-07-02T19:46:02.838Z",
            finished_at: "2024-07-02T19:46:02.838Z",
        },
    ],
};

jest.mock("../../database/services/UnitService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            get: jest.fn().mockReturnValue(unit),
            update: jest.fn().mockReturnValue(updatedUnit),
        };
    });
});

jest.mock("../../database/services/ChargeService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            db: "foobar",
            get: jest.fn().mockReturnValue({
                id: 83838,
                started_at: "2022-07-02T19:46:02.838Z",
                finished_at: null,
            }),
            update: jest.fn().mockRejectedValue({
                id: 83838,
                started_at: "2022-07-02T19:46:02.838Z",
                finished_at: "2024-07-02T19:46:02.838Z",
            }),
        };
    });
});

describe("Stop Charge handler", () => {
    test("it add the finished_at data into the charge and return the unit", async () => {
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

        const response = (await stopHandler(event)) as { body: string };

        expect(JSON.parse(response.body)).toEqual({});
    });

    test("error return for missing finished_at", async () => {
        const body = JSON.stringify({
            started_at: "2024-07-02T19:46:02.824Z",
        });
        const event = {
            pathParameters: {
                unitId: 80971,
                chargeId: 83838,
            },
            body,
        };

        const response = (await stopHandler(event)) as { body: string; statusCode: number };

        expect(response.statusCode).toEqual(422);
        expect(JSON.parse(response.body)).toEqual({
            message: '"finished_at" is required',
        });
    });
});
