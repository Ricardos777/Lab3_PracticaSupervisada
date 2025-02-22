import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import { seedDefaultData } from "./src/helpers/seed.js";

config();

// Inicializo el servidor con la configuración establecida.
initServer();

// Ejecuto la semilla para crear el usuario administrador y la categoría por defecto.
seedDefaultData();

console.log("Servidor iniciado y datos semilla creados.");
