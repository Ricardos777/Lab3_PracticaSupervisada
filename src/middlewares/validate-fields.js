import { validationResult } from "express-validator";

/* 
  Yo implemento este middleware para revisar los resultados de las validaciones.
  Si hay errores, los propago para que sean gestionados en el middleware de errores.
*/
export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  next();
};
