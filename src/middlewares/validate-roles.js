/* 
  Yo implemento este middleware para verificar que el usuario autenticado tenga uno de los roles autorizados.
  Si no es así, retorno un error de autorización.
*/
export const hasRoles = (...roles) => {
    return (req, res, next) => {
      if (!req.usuario) {
        return res.status(500).json({
          success: false,
          message: "Se requiere validar el rol antes de validar el token"
        });
      }
      if (!roles.includes(req.usuario.role)) {
        return res.status(401).json({
          success: false,
          message: `Usuario no autorizado, se requiere uno de los siguientes roles: ${roles}`
        });
      }
      next();
    };
  };
  