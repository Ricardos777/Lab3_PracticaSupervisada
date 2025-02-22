import rateLimit from "express-rate-limit";

/* 
  Yo configuro un limitador de peticiones para evitar abusos en la API.
  Limito a 50 peticiones cada 15 minutos por IP.
*/
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
});

export default apiLimiter;
