# Lab3_PracticaSupervisada
# gestorOpiniones API

Bienvenido a gestorOpiniones, una API RESTful desarrollada por mí, Ricardo Figueroa, para la gestión de opiniones. Este proyecto se realizó en Node.js, Express y MongoDB, y tiene como objetivo simular un sistema de publicaciones y comentarios similar a lo que encontramos en redes sociales, pero enfocado en la expresión y administración de opiniones.  

---

## Presentación Personal

Hola, soy Ricardo Figueroa, estudiante con número de carnet **2023370** y código técnico **IN6BV**. Este proyecto es fruto de mi esfuerzo y dedicación en el curso, bajo la dirección de mi profesor, Braulio Echeverria. En gestorOpiniones he buscado aplicar todo lo aprendido sobre seguridad, validaciones y buenas prácticas de desarrollo, creando una API modular, segura y fácil de mantener.

---

## Descripción de la API

gestorOpiniones permite:

- **Autenticación y Gestión de Usuarios:**  
  - Registro de usuarios con validación de datos y opción para subir una imagen de perfil.  
  - Inicio de sesión mediante email o username, generando un token JWT para acceso seguro a las funcionalidades protegidas.  
  - Gestión del perfil, donde el usuario puede actualizar sus datos, cambiar su contraseña (con verificación de la contraseña actual) y modificar su foto de perfil.
  
- **Gestión de Publicaciones:**  
  - Los usuarios pueden crear publicaciones que incluyan un título, contenido y una categoría asignada.  
  - Solo el autor de una publicación puede editarla o eliminarla, garantizando la integridad y propiedad del contenido.

- **Gestión de Comentarios:**  
  - Los usuarios pueden comentar en las publicaciones para expresar sus opiniones o agregar información adicional.  
  - Solo el autor de un comentario puede editarlo o eliminarlo, protegiendo la autoría y responsabilidad de cada mensaje.

- **Gestión de Categorías:**  
  - Este módulo está reservado exclusivamente para el administrador del sistema.  
  - Permite crear, editar y eliminar categorías.  
  - Al iniciar el sistema se crea automáticamente una categoría por defecto, la cual se usa para reasignar publicaciones en caso de eliminación de otra categoría.

Además, al arrancar la aplicación, se ejecuta un proceso que se encarga de sembrar la base de datos con un usuario administrador y una categoría predeterminada, asegurando que el sistema siempre tenga una estructura mínima operativa.

---

## Diagrama de Flujo del Sistema

A continuación, presento un diagrama de flujo que resume el proceso general de la API. Este diagrama refleja mi forma de pensar en la arquitectura del sistema, mostrando la secuencia desde la inicialización hasta el manejo de cada módulo:

```mermaid
flowchart TD
    A[Inicio del Sistema] --> B[Verificación de Datos Semilla]
    B --> C{¿Existe Admin y Categoría Default?}
    C -- No --> D[Crear Usuario Admin]
    C -- No --> E[Crear Categoría Default]
    C -- Sí --> F[Inicialización Completa]
    F --> G[Esperando Peticiones]
    
    subgraph Autenticación y Usuarios
      G --> H[Registro de Usuario]
      H --> I{Validar Datos de Registro}
      I -- Correcto --> J[Guardar Usuario en BD]
      I -- Incorrecto --> K[Retornar Error]
      G --> L[Inicio de Sesión]
      L --> M{Verificar Credenciales}
      M -- Correcto --> N[Generar JWT y Retornar Token]
      M -- Incorrecto --> O[Retornar Error de Autenticación]
      G --> P[Consultar/Actualizar Perfil]
    end

    subgraph Publicaciones y Comentarios
      G --> Q[Crear Publicación]
      Q --> R{Usuario Autenticado?}
      R -- Sí --> S[Guardar Publicación con Datos y Categoría]
      R -- No --> T[Error: Autenticación Requerida]
      G --> U[Editar/Eliminar Publicación]
      U --> V{Verificar Propiedad}
      V -- Propietario --> W[Procesar Edición/Eliminación]
      V -- No --> X[Error: Permisos Insuficientes]
      G --> Y[Crear Comentario]
      Y --> Z{Verificar Autenticación}
      Z -- Sí --> AA[Guardar Comentario en Publicación]
      Z -- No --> AB[Error: Autenticación Requerida]
      G --> AC[Editar/Eliminar Comentario]
      AC --> AD{Verificar Propiedad del Comentario}
      AD -- Propietario --> AE[Actualizar/Eliminar Comentario]
      AD -- No --> AF[Error: Permisos Insuficientes]
    end

    subgraph Gestión de Categorías (Solo Admin)
      G --> AG[Gestionar Categorías]
      AG --> AH{Validar Rol ADMIN_ROLE}
      AH -- Sí --> AI[Crear/Editar/Eliminar Categoría]
      AI --> AJ[Reasignar Publicaciones si se Elimina Categoría]
      AH -- No --> AK[Error: No Autorizado]
    end
