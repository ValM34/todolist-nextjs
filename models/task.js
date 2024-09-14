import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
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
