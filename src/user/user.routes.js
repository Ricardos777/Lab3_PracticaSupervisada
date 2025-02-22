import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/* 
  Yo defino las rutas para la gestión de usuarios.
  Incluyo:
   - Obtener un usuario por ID
   - Obtener todos los usuarios (con paginación)
   - "Eliminar" un usuario (cambiando su estado)
   - Actualizar la contraseña (verificando la actual)
   - Actualizar datos generales del usuario
   - Actualizar la foto de perfil (usando Multer para la carga de archivos)
*/
router.get("/findUser/:uid", getUserByIdValidator, getUserById);
router.get("/", getUsers);
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);
router.put("/updateUser/:uid", updateUserValidator, updateUser);
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router;
