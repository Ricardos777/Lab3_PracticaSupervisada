import { Router } from "express";
import { createCategory, updateCategory, deleteCategory, getCategories } from "./category.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";

const router = Router();

/* 
  Yo defino las rutas para la gestión de categorías.
  La obtención es pública, pero la creación, actualización y eliminación requieren autenticación y rol de administrador.
*/
router.get("/", getCategories);

router.post(
  "/",
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  validarCampos,
  createCategory
);

router.put(
  "/:id",
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  param("id").isMongoId().withMessage("ID de categoría no válido"),
  validarCampos,
  updateCategory
);

router.delete(
  "/:id",
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  param("id").isMongoId().withMessage("ID de categoría no válido"),
  validarCampos,
  deleteCategory
);

export default router;
