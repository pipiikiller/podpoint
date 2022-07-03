import { DataSource, ObjectType, Repository } from "typeorm";
import { AppDataSource } from "./DataSource";

export class Database {
    private datasource: DataSource;
    private static instance: Database;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public async getDatasource() {
        try {
            if (Database.getInstance().datasource && Database.getInstance().datasource.isInitialized) {
                return Database.getInstance().datasource;
            } else {
                return (Database.getInstance().datasource = await AppDataSource.initialize());
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getRepository<T>(entity: ObjectType<T>): Promise<Repository<T>> {
        const connection: DataSource = await this.getDatasource();

        return connection.getRepository(entity);
    }
}
