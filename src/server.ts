import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database.js";
import mainRouter from "./routes/index.js";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos exitosa.");
        
        app.use('/api', mainRouter);

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("Error de conexión a la base de datos: ", error));