import Category from "./category.model.js";
import Publication from "../publication/publication.model.js";

/* 
  Yo implemento el controlador para crear una categoría.
  Solo el administrador (a través de las validaciones en la ruta) puede acceder a esta función.
*/
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    return res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      category
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear categoría",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar una categoría.
  Me aseguro de no permitir la modificación del indicador de categoría por defecto.
*/
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.isDefault !== undefined) {
      delete data.isDefault;
    }
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Categoría actualizada",
      category
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la categoría",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para eliminar una categoría.
  Antes de eliminarla, reasigno las publicaciones que dependan de ella a la categoría por defecto.
*/
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada"
      });
    }
    if (category.isDefault) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar la categoría por defecto"
      });
    }
    const defaultCategory = await Category.findOne({ isDefault: true });
    if (!defaultCategory) {
      return res.status(500).json({
        success: false,
        message: "No se encontró la categoría por defecto para reasignar publicaciones"
      });
    }
    await Publication.updateMany(
      { category: id },
      { category: defaultCategory._id }
    );
    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Categoría eliminada y publicaciones reasignadas a la categoría por defecto"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la categoría",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para obtener todas las categorías.
*/
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      categories
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las categorías",
      error: err.message
    });
  }
};
