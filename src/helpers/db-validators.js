import User from "../user/user.model.js";

/* 
  Yo defino funciones de validación para verificar la existencia de datos en la base.
  Por ejemplo, para evitar registros duplicados de email o username.
*/
export const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`El email ${email} ya está registrado`);
  }
};

export const usernameExists = async (username = "") => {
  const exists = await User.findOne({ username });
  if (exists) {
    throw new Error(`El username ${username} ya está registrado`);
  }
};

export const userExists = async (uid = "") => {
  const exists = await User.findById(uid);
  if (!exists) {
    throw new Error("No existe el usuario con el ID proporcionado");
  }
};
