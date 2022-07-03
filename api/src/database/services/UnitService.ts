import * as faker from "faker";
import { UnitServiceInterface } from "../../types/database/services/UnitService";
import { UnitStatus } from "../../types/entities/Unit";
import DatabaseException from "../../utils/exceptions/DatabaseException";
import { Database } from "../Database";
import Unit from "../entities/Unit";

export default class UnitService implements UnitServiceInterface {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    updateStatus(status: UnitStatus): Promise<Unit[]> {
        throw new Error("Method not implemented.");
    }

    async getRepo() {
        const repository = await this.db.getRepository(Unit);

        return repository;
    }

    build(data: Partial<Unit>): Unit {
        const unit = new Unit();
        unit.id = data.id || faker.datatype.number();
        unit.name = data.name || faker.company.companyName();
        unit.address = data.address || faker.address.streetName();
        unit.postcode = data.postcode || faker.address.zipCode();
        unit.status = data.status || UnitStatus.AVAILABLE;
        unit.charges = data.charges || [];

        return unit;
    }

    async listAll(): Promise<Unit[]> {
        return (await this.getRepo()).find({
            relations: {
                charges: true,
            },
        });
    }

    async create(unit: Partial<Unit>): Promise<Unit> {
        return (await this.getRepo()).save(this.build(unit));
    }

    async update(unit: Partial<Unit>): Promise<Unit> {
        const result = await (
            await this.getRepo()
        )
            .createQueryBuilder()
            .update(Unit)
            .set({
                name: unit.name,
                address: unit.address,
                postcode: unit.postcode,
                status: unit.status,
            })
            .where({
                id: unit.id,
            })
            .returning("*")
            .execute();

        const [updatedUnit] = result.raw;

        return updatedUnit;
    }

    delete(id: number): void {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<Unit> {
        const unit = await (
            await this.db.getRepository(Unit)
        ).findOne({
            where: { id },
            relations: {
                charges: true,
            },
        });

        if (!unit) {
            throw new DatabaseException(`No query results for model [Unit] ${id}`);
        }

        return unit;
    }
}
