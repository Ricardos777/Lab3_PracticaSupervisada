import { Router } from "express";
import { createComment, updateComment, deleteComment, getCommentsByPublication } from "./comment.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";

const router = Router();

/* 
  Yo defino las rutas para la gestión de comentarios.
  Se requiere autenticación para crear, editar o eliminar comentarios.
*/
router.get(
  "/:publicationId",
  param("publicationId").isMongoId().withMessage("ID de publicación no válido"),
  validarCampos,
  getCommentsByPublication
);

router.post(
  "/",
  validateJWT,
  body("text").notEmpty().withMessage("El texto del comentario es obligatorio"),
  body("publication").isMongoId().withMessage("ID de publicación no válido"),
  validarCampos,
  createComment
);

router.put(
  "/:id",
  validateJWT,
  param("id").isMongoId().withMessage("ID de comentario no válido"),
  body("text").notEmpty().withMessage("El texto del comentario es obligatorio"),
  validarCampos,
  updateComment
);

router.delete(
  "/:id",
  validateJWT,
  param("id").isMongoId().withMessage("ID de comentario no válido"),
  validarCampos,
  deleteComment
);

export default router;
