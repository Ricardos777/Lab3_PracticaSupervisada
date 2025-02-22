import { Schema, model } from "mongoose";

/* 
  Yo defino el esquema para los usuarios.
  Se establecen restricciones y validaciones para cada campo, y se utiliza un método personalizado
  para ocultar la contraseña y renombrar _id a uid al convertir el documento a JSON.
*/
const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      maxLength: [25, "El nombre no puede exceder 25 caracteres"]
    },
    surname: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      maxLength: [25, "El apellido no puede exceder 25 caracteres"]
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"]
    },
    profilePicture: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      required: true,
      minLength: [8, "El teléfono debe tener 8 dígitos"],
      maxLength: [8, "El teléfono debe tener 8 dígitos"]
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE", "TEACHER_ROLE", "STUDENT_ROLE"]
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

/* 
  Sobrescribo el método toJSON para eliminar la contraseña y transformar _id a uid.
*/
userSchema.methods.toJSON = function () {
  const { password, __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("User", userSchema);
