import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { UnitInterface, UnitStatus } from "../../types/entities/Unit";
import BaseEntity from "./BaseEntity";
import Charge from "./Charge";

@Entity()
export default class Unit extends BaseEntity implements UnitInterface {
    @PrimaryColumn()
    public id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    postcode: string;

    @Column({
        type: "enum",
        enum: UnitStatus,
        default: UnitStatus.AVAILABLE,
    })
    status: UnitStatus;

    @OneToMany((type) => Charge, (charge) => charge.unit, { eager: true, cascade: true })
    charges?: Charge[];
}
