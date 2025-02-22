import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/* 
  Yo configuro Swagger para generar la documentación de la API.
  Defino la versión, título, descripción y contacto. Además, especifico las rutas donde Swagger buscará
  las anotaciones de la API.
*/
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "gestorOpiniones API",
      version: "1.0.0",
      description: "API para la gestión de opiniones",
      contact: {
        name: "Ricardo Figueroa Juarez",
        email: "ricardo@example.com"
      }
    },
    servers: [
      {
        url: "http://127.0.0.1:3000/gestorOpiniones/v1"
      }
    ]
  },
  apis: [
    "./src/auth/*.js",
    "./src/user/*.js",
    "./src/category/*.js",
    "./src/publication/*.js",
    "./src/comment/*.js"
  ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
