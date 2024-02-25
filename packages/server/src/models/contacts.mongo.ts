/**
 * @module contacts.mongo
 * Contacts mongoose schema & model
 */
import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// contacts collection
export default mongoose.model('Contact', ContactsSchema);
