import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/* 
  Yo defino las rutas de autenticación.
  La ruta de registro utiliza Multer para subir la foto de perfil y valida los campos requeridos.
  La ruta de login valida el formato de email/username y contraseña.
*/
router.post(
  "/register",
  uploadProfilePicture.single("profilePicture"),
  registerValidator,
  register
);

router.post(
  "/login",
  loginValidator,
  login
);

export default router;
