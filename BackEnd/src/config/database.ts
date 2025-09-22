import { DataSource } from "typeorm";
import { Usuario } from "../entities/Usuario.js";
import { Producto } from "../entities/Producto.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234567890",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [Usuario, Producto],
    migrations: [],
    subscribers: [],
});