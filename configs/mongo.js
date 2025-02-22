'use strict'
import mongoose from "mongoose";

/* 
  Yo configuro la conexión a MongoDB, definiendo eventos para controlar la conexión,
  errores, reconexiones y desconexiones. Esto me permite monitorear el estado de la base de datos.
*/
export const dbConnection = async () => {
  try {
    mongoose.connection.on("error", () => {
      console.log("MongoDB | No se pudo conectar a MongoDB");
      mongoose.disconnect();
    });
    mongoose.connection.on("connecting", () => {
      console.log("MongoDB | Intentando conectar...");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB | Conectado a MongoDB");
    });
    mongoose.connection.on("open", () => {
      console.log("MongoDB | Conexión abierta a la base de datos");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB | Reconectado a MongoDB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB | Desconectado de MongoDB");
    });

    await mongoose.connect(process.env.URI_MONGO, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50
    });
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
  }
};
