import Publication from "./publication.model.js";

/* 
  Yo implemento la función para que un usuario cree una publicación.
  Se asigna el usuario autenticado como autor.
*/
export const createPublication = async (req, res) => {
  try {
    const { title, text, category } = req.body;
    const author = req.usuario._id;
    const publication = await Publication.create({ title, text, category, author });
    return res.status(201).json({
      success: true,
      message: "Publicación creada exitosamente",
      publication
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la publicación",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar una publicación.
  Solo el autor de la publicación puede editarla.
*/
export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada"
      });
    }
    if (publication.author.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para editar esta publicación"
      });
    }
    const updatedPublication = await Publication.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      success: true,
      message: "Publicación actualizada",
      publication: updatedPublication
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la publicación",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para eliminar una publicación.
  Solo el autor de la publicación puede eliminarla.
*/
export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada"
      });
    }
    if (publication.author.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para eliminar esta publicación"
      });
    }
    await Publication.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Publicación eliminada"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la publicación",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para obtener todas las publicaciones, incluyendo la información del autor y la categoría.
*/
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
      .populate("author", "name username")
      .populate("category", "name");
    return res.status(200).json({
      success: true,
      publications
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las publicaciones",
      error: err.message
    });
  }
};
