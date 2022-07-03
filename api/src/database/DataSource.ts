import { DataSource } from "typeorm";
import Charge from "./entities/Charge";
import Unit from "./entities/Unit";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    // host: "localhost",
    port: Number(process.env.PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DATABASE_NAME || "podpoint",
    synchronize: true,
    logging: true,
    entities: [Unit, Charge],
    subscribers: [],
    migrations: [],
});
