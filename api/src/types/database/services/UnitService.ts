import Unit from "../../../database/entities/Unit";
import { UnitStatus } from "../../entities/Unit";
import { GenericServiceInterface } from "./GenericService";

export interface UnitServiceInterface extends GenericServiceInterface<Unit> {
    listAll(): Promise<Unit[]>;
    updateStatus(status: UnitStatus): Promise<Unit[]>;
}
