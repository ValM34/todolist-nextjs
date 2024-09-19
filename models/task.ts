import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
    maxlength: [100, 'Le titre ne doit pas contenir plus de 100 caractères'],
  },
  description: {
    type: String,
    maxlength: [500, "La description ne doit pas contenir plus de 500 caractères"],
    required: false,
  },
  completed: {
    type: String,
    enum: ['A faire', 'En cours', 'Terminée'],
    required: [true, 'Le statut est requis'],
  },
  emergency: {
    type: String,
    enum: ['Faible', 'Moyenne', 'Forte'],
    required: [true, 'L\'urgence est requise'],
  },
  importance: {
    type: String,
    enum: ['Faible', 'Moyenne', 'Forte'],
    required: [true, 'L\'importance est requise'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Le projet est requis'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur est requis'],
  },
},
{
  timestamps: true,
},
);

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
