import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      minlength: [3, "Le titre doit contenir au moins 3 caractères"],
      maxlength: [100, "Le titre ne doit pas contenir plus de 100 caractères"],
    },
    description: {
      type: String,
      maxlength: [500, "La description ne doit pas contenir plus de 500 caractères"],
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est requis"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
