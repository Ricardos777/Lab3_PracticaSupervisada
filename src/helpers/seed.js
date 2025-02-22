import User from "../user/user.model.js";
import Category from "../category/category.model.js";
import { hash } from "argon2";

/* 
  Yo creo la función que se encarga de sembrar los datos por defecto.
  Verifico si existe ya un usuario administrador y, en caso negativo, lo creo.
  También verifico la existencia de la categoría por defecto y la creo si no existe.
*/
export const seedDefaultData = async () => {
  try {
    // Verifico si existe un usuario con rol de administrador
    const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
    if (!adminExists) {
      const defaultAdminData = {
        name: "Administrador",
        surname: "Del Sistema",
        username: "admin",
        email: "admin@default.com",
        password: await hash("admin1234"), // Contraseña por defecto; recomiendo cambiarla luego
        phone: "00000000",
        role: "ADMIN_ROLE",
        profilePicture: null
      };
      await User.create(defaultAdminData);
      console.log("Usuario admin por defecto creado");
    } else {
      console.log("Usuario admin ya existe");
    }

    // Verifico si existe una categoría por defecto
    const defaultCategoryExists = await Category.findOne({ isDefault: true });
    if (!defaultCategoryExists) {
      const defaultCategoryData = {
        name: "Default",
        description: "Categoría por defecto",
        isDefault: true
      };
      await Category.create(defaultCategoryData);
      console.log("Categoría por defecto creada");
    } else {
      console.log("Categoría por defecto ya existe");
    }
  } catch (error) {
    console.error("Error al sembrar datos por defecto:", error);
  }
};
