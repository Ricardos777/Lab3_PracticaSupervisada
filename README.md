# gestorOpiniones API

Bienvenido a **gestorOpiniones**, una API RESTful que desarrollé en Node.js, Express y MongoDB para gestionar un sistema de opiniones similar a lo que se ve en redes sociales. Esta aplicación permite a los usuarios registrarse, iniciar sesión, administrar sus perfiles, crear publicaciones, comentar y gestionar categorías (opción exclusiva para el administrador). Al iniciar el sistema se crea automáticamente un usuario administrador y una categoría predeterminada para garantizar que siempre exista una base mínima operativa.

---

## Presentación Personal

Soy **Ricardo Figueroa**  
**Carnet:** 2023370  
**Código Técnico:** IN6BV  
**Profesor:** Braulio Echeverria

Este proyecto es el resultado de mi esfuerzo personal y la aplicación de los conocimientos adquiridos. Mi intención fue desarrollar una API modular, segura y fácil de mantener, poniendo especial énfasis en las validaciones y el manejo correcto de errores.

---

## Descripción de la API

**gestorOpiniones** ofrece las siguientes funcionalidades:

- **Autenticación y Gestión de Usuarios:**  
  - Registro seguro de nuevos usuarios (con opción de subir foto de perfil).  
  - Inicio de sesión mediante email o username, generando un token para acceder a funciones protegidas.  
  - Administración del perfil: actualización de datos y cambio de contraseña (con verificación previa de la contraseña actual).

- **Gestión de Publicaciones:**  
  - Creación de publicaciones que incluyen título, contenido y categoría.  
  - Solo el creador de la publicación puede editarla o eliminarla.

- **Gestión de Comentarios:**  
  - Los usuarios pueden comentar en las publicaciones para expresar sus opiniones.  
  - Solo el autor de un comentario puede modificarlo o eliminarlo.

- **Gestión de Categorías:**  
  - Exclusiva para el administrador del sistema.  
  - Permite crear, editar y eliminar categorías.  
  - Se crea automáticamente una categoría predeterminada para reasignar publicaciones si se elimina otra.

- **Semilla de Datos:**  
  - Al arrancar la aplicación se verifica y, en caso de no existir, se crea un usuario administrador y una categoría predeterminada.

---

## Flujo General del Sistema (Resumen en Viñetas)

- **Inicio del Sistema:**
  - Revisar si ya existe un usuario administrador y una categoría predeterminada.
  - Si no existen, se crean ambos para garantizar el correcto funcionamiento del sistema.
  - Una vez configurado, el sistema queda a la espera de solicitudes.

- **Para Usuarios y Autenticación:**
  - **Registro:**  
    - El usuario ingresa sus datos.
    - Se verifican los datos proporcionados.
    - Si todo es correcto, se guarda el usuario en la base de datos; si hay errores, se muestra un mensaje de validación.
  - **Inicio de Sesión:**  
    - El usuario envía sus credenciales.
    - Se revisa que las credenciales sean correctas.
    - Si son válidas, se entrega un token de acceso; si no, se informa del error.
  - **Consulta y Actualización del Perfil:**  
    - El usuario puede consultar y modificar sus datos personales, incluyendo su foto de perfil.

- **Para Publicaciones y Comentarios:**
  - **Publicaciones:**  
    - Crear publicación: se verifica si el usuario está autenticado y, de ser así, se guarda la publicación.
    - Editar o eliminar publicación: solo el autor de la publicación puede realizar estas acciones; de lo contrario, se muestra un error.
  - **Comentarios:**  
    - Crear comentario: el usuario debe estar autenticado para poder comentar.
    - Editar o eliminar comentario: únicamente el autor del comentario puede modificarlo o eliminarlo.

- **Para la Gestión de Categorías (Solo Admin):**
  - El administrador puede gestionar las categorías.
  - Se verifica que el usuario tenga el rol de administrador antes de permitir crear, editar o eliminar una categoría.
  - Al eliminar una categoría, se reasignan las publicaciones a la categoría predeterminada.

---

## Endpoints de la API

### **Auth**
- **POST /gestorOpiniones/v1/auth/register**  
  Registra un nuevo usuario.  
  *Formato:* form-data (opción para subir imagen de perfil).

- **POST /gestorOpiniones/v1/auth/login**  
  Inicia sesión con email o username y contraseña.  
  *Formato:* raw (JSON).

### **Users**
- **GET /gestorOpiniones/v1/user/findUser/{uid}**  
  Obtiene la información de un usuario específico. *(Requiere autenticación)*

- **GET /gestorOpiniones/v1/user**  
  Lista todos los usuarios (con paginación). *(Requiere autenticación)*

- **DELETE /gestorOpiniones/v1/user/deleteUser/{uid}**  
  Desactiva un usuario (cambiando su estado). *(Requiere autenticación)*

- **PATCH /gestorOpiniones/v1/user/updatePassword/{uid}**  
  Cambia la contraseña del usuario. Se envían `oldPassword` y `newPassword` en JSON. *(Requiere autenticación)*

- **PUT /gestorOpiniones/v1/user/updateUser/{uid}**  
  Actualiza datos personales del usuario.  
  *Formato:* form-data.

- **PATCH /gestorOpiniones/v1/user/updateProfilePicture/{uid}**  
  Actualiza la foto de perfil.  
  *Formato:* form-data (archivo).

### **Categories**
- **GET /gestorOpiniones/v1/category**  
  Lista todas las categorías.

- **POST /gestorOpiniones/v1/category**  
  Crea una nueva categoría. *(Requiere autenticación y rol ADMIN_ROLE)*

- **PUT /gestorOpiniones/v1/category/{id}**  
  Actualiza una categoría existente. *(Requiere autenticación y rol ADMIN_ROLE)*

- **DELETE /gestorOpiniones/v1/category/{id}**  
  Elimina una categoría y reasigna las publicaciones a la categoría predeterminada. *(Requiere autenticación y rol ADMIN_ROLE)*

### **Publications**
- **GET /gestorOpiniones/v1/publication**  
  Lista todas las publicaciones.

- **POST /gestorOpiniones/v1/publication**  
  Crea una nueva publicación.  
  *Formato:* raw (JSON con título, texto y categoría). *(Requiere autenticación)*

- **PUT /gestorOpiniones/v1/publication/{id}**  
  Actualiza una publicación. Solo el autor puede editarla. *(Requiere autenticación)*

- **DELETE /gestorOpiniones/v1/publication/{id}**  
  Elimina una publicación. Solo el autor puede eliminarla. *(Requiere autenticación)*

### **Comments**
- **GET /gestorOpiniones/v1/comment/{publicationId}**  
  Obtiene los comentarios de una publicación.

- **POST /gestorOpiniones/v1/comment**  
  Crea un comentario en una publicación.  
  *Formato:* raw (JSON con texto y publicación). *(Requiere autenticación)*

- **PUT /gestorOpiniones/v1/comment/{id}**  
  Actualiza un comentario. Solo el autor puede modificarlo. *(Requiere autenticación)*

- **DELETE /gestorOpiniones/v1/comment/{id}**  
  Elimina un comentario. Solo el autor puede eliminarlo. *(Requiere autenticación)*

---

## Instalación y Ejecución

1. **Clonar el Repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd gestorOpiniones
