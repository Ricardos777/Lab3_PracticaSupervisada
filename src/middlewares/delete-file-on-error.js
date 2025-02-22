import fs from "fs/promises";
import { join } from "path";

/* 
  Yo implemento este middleware para eliminar archivos que se hayan subido si ocurre un error posterior.
  Esto evita dejar archivos huérfanos en el servidor.
*/
export const deleteFileOnError = async (err, req, res, next) => {
  if (req.file && req.filePath) {
    const filePath = join(req.filePath, req.file.filename);
    try {
      await fs.unlink(filePath);
      console.log("Archivo eliminado por error:", filePath);
    } catch (unlinkErr) {
      console.error(`Error al eliminar archivo: ${unlinkErr}`);
    }
  }
  next(err);
};
