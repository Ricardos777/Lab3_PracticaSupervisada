import { Router } from "express";
import { createPublication, updatePublication, deletePublication, getPublications } from "./publication.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";

const router = Router();

/* 
  Yo defino las rutas para la gestión de publicaciones.
  Se requiere que el usuario esté autenticado para crear, editar o eliminar publicaciones.
*/
router.get("/", getPublications);

router.post(
  "/",
  validateJWT,
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("text").notEmpty().withMessage("El contenido es obligatorio"),
  body("category").isMongoId().withMessage("La categoría debe ser un ID válido"),
  validarCampos,
  createPublication
);

router.put(
  "/:id",
  validateJWT,
  param("id").isMongoId().withMessage("ID de publicación no válido"),
  validarCampos,
  updatePublication
);

router.delete(
  "/:id",
  validateJWT,
  param("id").isMongoId().withMessage("ID de publicación no válido"),
  validarCampos,
  deletePublication
);

export default router;
