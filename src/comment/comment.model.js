import { Schema, model } from "mongoose";

/* 
  Yo defino el esquema para los comentarios.
  Cada comentario contiene un texto, la referencia a la publicación y al autor.
*/
const commentSchema = Schema(
  {
    text: {
      type: String,
      required: [true, "El comentario es obligatorio"]
    },
    publication: {
      type: Schema.Types.ObjectId,
      ref: "Publication",
      required: [true, "La publicación es obligatoria"]
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

export default model("Comment", commentSchema);
