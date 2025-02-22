import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/* 
  Yo implemento la función para obtener un usuario por su ID.
*/
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para obtener todos los usuarios, con paginación.
*/
export const getUsers = async (req, res) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    return res.status(200).json({
      success: true,
      total,
      users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para "eliminar" un usuario cambiando su estado a false.
*/
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Usuario eliminado",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar la contraseña.
  Verifico que la contraseña actual coincida y que la nueva no sea igual a la anterior.
*/
export const updatePassword = async (req, res) => {
  try {
    const { uid } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(uid);
    const validPassword = await verify(user.password, oldPassword);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "La contraseña actual no coincide"
      });
    }
    const matchOldAndNewPassword = await verify(user.password, newPassword);
    if (matchOldAndNewPassword) {
      return res.status(400).json({
        success: false,
        message: "La nueva contraseña no puede ser igual a la anterior"
      });
    }
    const encryptedPassword = await hash(newPassword);
    await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Contraseña actualizada"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la contraseña",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar otros datos del usuario.
*/
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const user = await User.findByIdAndUpdate(uid, data, { new: true });
    return res.status(200).json({
      success: true,
      message: "Usuario actualizado",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar la foto de perfil.
  Si el usuario ya tiene una foto, la elimino y guardo la nueva.
*/
export const updateProfilePicture = async (req, res) => {
  try {
    const { uid } = req.params;
    let newProfilePicture = req.file ? req.file.filename : null;
    if (!newProfilePicture) {
      return res.status(400).json({
        success: false,
        message: "No se encontró archivo en la petición"
      });
    }
    const user = await User.findById(uid);
    if (user.profilePicture) {
      const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
      await fs.unlink(oldProfilePicturePath);
    }
    user.profilePicture = newProfilePicture;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Foto de perfil actualizada",
      profilePicture: user.profilePicture
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la foto de perfil",
      error: err.message
    });
  }
};
