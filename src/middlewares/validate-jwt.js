import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

/* 
  Yo valido el token JWT enviado en la petición. El token se limpia del prefijo "Bearer"
  y se verifica que el usuario exista y esté activo.
*/
export const validateJWT = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No se proporcionó un token en la petición"
      });
    }
    token = token.replace(/^Bearer\s+/, "");
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Usuario no existe en la base de datos"
      });
    }
    if (!user.status) {
      return res.status(400).json({
        success: false,
        message: "El usuario fue desactivado"
      });
    }
    req.usuario = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al validar el token",
      error: err.message
    });
  }
};
