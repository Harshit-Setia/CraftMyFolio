import mongoose from "mongoose";

const folioSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  template_id: { type: String, required: true },
  // main_color: { type: String, default: "#000000" },
  // secondry_color: { type: String, default: "#FFFFFF" },
  // accent_color: { type: String, default: "#FFFFFF" },
  // font: { type: String, default: "Arial" },
});

export const Folio = mongoose.model("Folio", folioSchema);
