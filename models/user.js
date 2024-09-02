import mongoose from 'mongoose';

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
},
{
  timestamps: true,
},
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
