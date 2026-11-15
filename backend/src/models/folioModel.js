import mongoose from "mongoose";

const folioSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
  },
  
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
    unique: true
  },

  template_id: { 
    type: String, 
    required: true 
  },
},{timestamps:true});

export const Folio = mongoose.model("Folio", folioSchema);
