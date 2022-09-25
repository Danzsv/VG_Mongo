const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GenreSchema.plugin(mongooseDelete, { overrideMethods: "all" }); //config borrado logico
const GenreModel = model("Genre", GenreSchema); // Creación Modelo/Schema

module.exports = GenreModel;
