import mongoose from 'mongoose';
import Project from './project';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
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


