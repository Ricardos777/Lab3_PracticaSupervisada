import { Schema, model } from "mongoose";

/* 
  Yo defino el esquema de las categorías.
  Cada categoría tiene un nombre único, una descripción y un indicador que señala si es la categoría por defecto.
*/
const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true
    },
    description: {
      type: String,
      default: ""
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model("Category", categorySchema);
