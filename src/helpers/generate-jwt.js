import jwt from "jsonwebtoken";

/* 
  Yo implemento la generación de JSON Web Tokens (JWT) para autenticar a los usuarios.
  El token contiene el uid del usuario y tiene un tiempo de expiración.
*/
export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "1h"
      },
      (err, token) => {
        if (err) {
          reject({
            success: false,
            message: err
          });
        } else {
          resolve(token);
        }
      }
    );
  });
};
