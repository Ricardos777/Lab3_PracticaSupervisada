/* 
  Yo implemento este middleware para manejar centralizadamente los errores.
  Si se detectan errores de validación, respondo con un estado 400; de lo contrario, con 500.
*/
export const handleErrors = (err, req, res, next) => {
    if (err.status === 400 || err.errors) {
      return res.status(400).json({
        success: false,
        errors: err.errors
      });
    }
    return res.status(500).json({
      success: false,
      message: err.message
    });
  };
  