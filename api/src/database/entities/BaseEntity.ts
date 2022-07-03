import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default class BaseEntity {
    @CreateDateColumn({
        name: "created_at",
        select: false,
    })
    public createdAt: string;

    @UpdateDateColumn({
        name: "updated_at",
        nullable: true,
        select: false,
    })
    public updatedAt: string | null;

    @DeleteDateColumn({
        name: "deleted_at",
        nullable: true,
        select: false,
    })
    public deletedAt: string | null;
}
