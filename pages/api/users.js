// pages/api/users.js

import dbConnect from '../../lib/dbConnect';
import User from '../../models/User'; // Un modèle mongoose

export default async function handler(req, res) {
  await dbConnect();

  // Tes opérations CRUD avec Mongoose ici
}
