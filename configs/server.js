"use strict";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/category/category.routes.js";
import publicationRoutes from "../src/publication/publication.routes.js";
import commentRoutes from "../src/comment/comment.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

/* 
  En este bloque configuro los middlewares globales para la aplicación.
  Aplico el parseo de JSON, habilito CORS, uso Helmet para seguridad, Morgan para logging y
  el limitador de peticiones.
*/
const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
        connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  }));
  app.use(morgan("dev"));
  app.use(apiLimiter);

  // Sirvo archivos estáticos desde la carpeta public
  app.use(express.static("public"));
};

/* 
  En este bloque registro las rutas de la API, segmentadas por módulos.
*/
const routes = (app) => {
  app.use("/gestorOpiniones/v1/auth", authRoutes);
  app.use("/gestorOpiniones/v1/user", userRoutes);
  app.use("/gestorOpiniones/v1/category", categoryRoutes);
  app.use("/gestorOpiniones/v1/publication", publicationRoutes);
  app.use("/gestorOpiniones/v1/comment", commentRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

/* 
  Realizo la conexión a la base de datos antes de iniciar el servidor.
*/
const conectarDB = async () => {
  try {
    await dbConnection();
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

/* 
  Inicializo el servidor aplicando los middlewares, conectando la base de datos y registrando las rutas.
*/
export const initServer = () => {
  const app = express();
  try {
    middlewares(app);
    conectarDB();
    routes(app);
    app.listen(process.env.PORT);
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (err) {
    console.log(`Server init failed: ${err}`);
  }
};
