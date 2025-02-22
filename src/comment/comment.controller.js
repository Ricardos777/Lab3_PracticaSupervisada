import Comment from "./comment.model.js";

/* 
  Yo implemento la función para crear un comentario.
  El comentario se asocia al usuario autenticado y a una publicación.
*/
export const createComment = async (req, res) => {
  try {
    const { text, publication } = req.body;
    const author = req.usuario._id;
    const comment = await Comment.create({ text, publication, author });
    return res.status(201).json({
      success: true,
      message: "Comentario creado exitosamente",
      comment
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el comentario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para actualizar un comentario.
  Solo el autor del comentario puede editarlo.
*/
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado"
      });
    }
    if (comment.author.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para editar este comentario"
      });
    }
    comment.text = text;
    await comment.save();
    return res.status(200).json({
      success: true,
      message: "Comentario actualizado",
      comment
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el comentario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para eliminar un comentario.
  Solo el autor del comentario puede eliminarlo.
*/
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado"
      });
    }
    if (comment.author.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para eliminar este comentario"
      });
    }
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Comentario eliminado"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el comentario",
      error: err.message
    });
  }
};

/* 
  Yo implemento la función para obtener todos los comentarios de una publicación específica.
*/
export const getCommentsByPublication = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const comments = await Comment.find({ publication: publicationId })
      .populate("author", "name username");
    return res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los comentarios",
      error: err.message
    });
  }
};
