import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

/* 
  Yo defino las validaciones para las rutas de usuarios: registro, login, actualización de contraseña,
  actualización de datos y foto de perfil.
*/
export const registerValidator = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("surname").notEmpty().withMessage("El apellido es requerido"),
  body("username").notEmpty().withMessage("El username es requerido"),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("No es un email válido"),
  body("email").custom(emailExists),
  body("username").custom(usernameExists),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }),
  validarCampos,
  deleteFileOnError,
  handleErrors
];

export const loginValidator = [
  body("email").optional().isEmail().withMessage("No es un email válido"),
  body("username").optional().isString().withMessage("Username en formato erróneo"),
  body("password").isLength({ min: 4 }).withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors
];

export const getUserByIdValidator = [
  validateJWT,
  hasRoles("ADMIN_ROLE", "USER_ROLE", "TEACHER_ROLE", "STUDENT_ROLE"),
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors
];

export const deleteUserValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors
];

export const updatePasswordValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("oldPassword").notEmpty().withMessage("La contraseña actual es requerida"),
  body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors
];

export const updateUserValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors
];

export const updateProfilePictureValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  deleteFileOnError,
  handleErrors
];
