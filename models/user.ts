import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le prénom doit contenir au maximum 50 caractères'],
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom doit contenir au maximum 100 caractères'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'L\'email est invalide'],
    unique: true,
    maxlength: [320, 'L\'email doit contenir au maximum 320 caractères'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [10, 'Le mot de passe doit contenir au moins 10 caractères'],
    maxlength: [100, 'Le mot de passe doit contenir au maximum 100 caractères'],
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
},
{
  timestamps: true,
},
);

// Suppression en CASCADE qui ne fonctionne pas
// UserSchema.pre('remove', function(next) {
//   const userId = this._id;
//   Project.remove({ user: userId }, (err) => {
//     if (err) {
//       next(err);
//     } else {
//       next();
//     }
//   });
// });

export default mongoose.models.User || mongoose.model('User', UserSchema);


