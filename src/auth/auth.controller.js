import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

/* 
  Yo creo el controlador para el registro de nuevos usuarios.
  Se encripta la contraseña y se asigna, opcionalmente, la foto de perfil.
*/
export const register = async (req, res) => {
  try {
    const data = req.body;
    let profilePicture = req.file ? req.file.filename : null;
    const encryptedPassword = await hash(data.password);
    data.password = encryptedPassword;
    data.profilePicture = profilePicture;

    const user = await User.create(data);

    return res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      name: user.name,
      email: user.email
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error en el registro del usuario",
      error: err.message
    });
  }
};

/* 
  Yo implemento el controlador para el inicio de sesión.
  Se permite iniciar sesión con email o username y se genera el token JWT.
*/
export const login = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
        error: "No existe el usuario o correo ingresado"
      });
    }

    const validPassword = await verify(user.password, password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
        error: "Contraseña incorrecta"
      });
    }

    const token = await generateJWT(user.id);
    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      userDetails: {
        token: token,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error en el login",
      error: err.message
    });
  }
};
