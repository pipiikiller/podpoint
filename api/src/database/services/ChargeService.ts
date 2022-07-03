import faker = require("faker");
import { ChargeServiceInterface } from "../../types/database/services/ChargeService";
import DatabaseException from "../../utils/exceptions/DatabaseException";
import { Database } from "../Database";
import Charge from "../entities/Charge";

export default class ChargeService implements ChargeServiceInterface {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    build(data: Partial<Charge>): Charge {
        const charge = new Charge();

        charge.id = data.id || faker.datatype.number();

        charge.started_at = data.started_at;
        charge.finished_at = data.finished_at;
        charge.unit = data.unit;

        return charge;
    }

    async getRepo() {
        const repository = await this.db.getRepository(Charge);

        return repository;
    }

    async create(charge: Partial<Charge>): Promise<Charge> {
        return (await this.getRepo()).save(this.build(charge));
    }

    async update(charge: Partial<Charge>): Promise<Charge> {
        const result = await (
            await this.getRepo()
        )
            .createQueryBuilder()
            .update(Charge)
            .set({
                started_at: charge.started_at,
                finished_at: charge.finished_at,
            })
            .where({
                id: charge.id,
            })
            .returning("*")
            .execute();

        const [updatedCharge] = result.raw;

        return updatedCharge;
    }

    delete(id: number): void {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<Charge> {
        const charge = await (
            await this.db.getRepository(Charge)
        ).findOne({
            where: { id },
            relations: {
                unit: true,
            },
        });

        if (!charge) {
            throw new DatabaseException(`No query results for model [Charge] ${id}`);
        }

        return charge;
    }
}
