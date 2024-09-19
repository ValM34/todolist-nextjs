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
      minlength: [10, "La description doit contenir au moins 10 caractères"],
      maxlength: [500, "La description ne doit pas contenir plus de 500 caractères"],
      required: false,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
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

// Suppression en CASCADE qui ne fonctionne pas
// ProjectSchema.pre('findOneAndDelete', async function(next) {
//   console.log('flsdkgjdfskljgljkfdgljkgfdljkgfljk')
//   const doc = await this.model.findOne(this.getFilter()); // Récupère le projet qui est supprimé
//   if (doc) {
//     // Supprime toutes les tâches liées au projet
//     await Task.deleteMany({ _id: { $in: doc.tasks } });
//   }
//   next();
// });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);