import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ChargeInterface } from "../../types/entities/Charge";
import BaseEntity from "./BaseEntity";
import Unit from "./Unit";

@Entity()
export default class Charge extends BaseEntity implements ChargeInterface {
    @PrimaryColumn()
    id: number;

    @Column({
        name: "started_at",
        nullable: true,
    })
    started_at?: string;

    @Column({
        name: "finished_at",
        nullable: true,
    })
    finished_at?: string;

    @ManyToOne((type) => Unit, (unit) => unit.charges)
    unit?: Unit;
}
