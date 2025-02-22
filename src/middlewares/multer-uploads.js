import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_SIZE = 10000000; // 10 MB

/* 
  Yo configuro Multer para gestionar la carga de archivos, específicamente para las fotos de perfil.
  Los archivos se guardarán en "public/uploads/profile-pictures". Además, guardo la ruta en req.filePath.
*/
const createMulterConfig = (destinationFolder) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const fullPath = join(CURRENT_DIR, destinationFolder);
        req.filePath = fullPath;
        cb(null, fullPath);
      },
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Solo se aceptan archivos de los siguientes tipos: ${MIMETYPES.join(", ")}`));
      }
    },
    limits: {
      fileSize: MAX_SIZE
    }
  });
};

export const uploadProfilePicture = createMulterConfig("../../public/uploads/profile-pictures");
