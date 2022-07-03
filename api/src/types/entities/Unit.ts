import { ChargeInterface } from "./Charge";

export interface UnitInterface {
    id: number;
    name: string;
    address: string;
    postcode: string;
    status: UnitStatus;
    charges?: ChargeInterface[];
}

export enum UnitStatus {
    AVAILABLE = "available",
    CHARGING = "charging",
}
