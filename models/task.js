import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
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
    default: 'A faire',
  },
  emergency: {
    type: String,
    enum: ['Urgent', 'Normal', 'Pas urgent'],
    default: 'Normal',
  },
},
{
  timestamps: true,
},
);

export default mongoose.models.Task || mongoose.model('Task', TodoSchema);
