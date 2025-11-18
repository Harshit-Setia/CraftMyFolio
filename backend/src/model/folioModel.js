import mongoose from "mongoose";

// This is the new Folio schema you agreed on.
// Its job is to link a public 'slug' to a user and a template.
const folioSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true, // No two users can have the same URL
    trim: true,
    lowercase: true,
  },
  
  // This links to the user who owns this portfolio
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // This 'ref' is the magic!
    required: true,
    unique: true // A user can only have one folio
  },

  // This stores which template to use, e.g., "template1"
  template_id: { 
    type: String, 
    required: true 
  },
});

export const Folio = mongoose.model("Folio", folioSchema);
