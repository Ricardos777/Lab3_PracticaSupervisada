import { Schema, model } from "mongoose";

/* 
  Yo defino el esquema para las publicaciones.
  Cada publicación tiene un título, contenido, categoría (referencia a Category) y autor (referencia a User).
*/
const publicationSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"]
    },
    text: {
      type: String,
      required: [true, "El contenido es obligatorio"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La categoría es obligatoria"]
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El autor es obligatorio"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model("Publication", publicationSchema);
