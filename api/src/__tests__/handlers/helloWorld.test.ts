import { test, describe, expect } from "@jest/globals";
import helloWorldHandler from "../../handlers/helloWorld";

describe("Hello world handler", () => {
    test("it returns hello world JSON", async () => {
        const expectedResponse = {
            hello: "world!",
        }

        const response = await helloWorldHandler() as { body: string };

        expect(JSON.parse(response.body)).toEqual(expectedResponse);
    });
});
