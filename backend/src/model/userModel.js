import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic information
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String }, // profile photo URL
  resume: { type: String }, // resume URL
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },

  // Education (flexible array, not fixed to xth/xiith/graduation)
  education: {
    type: [
      {
        level: { type: String, required: true }, // e.g. "10th", "12th", "Graduation"
        institution: { type: String, required: true },
        boardOrUniversity: { type: String },
        degree: { type: String }, // relevant for college
        fieldOfStudy: { type: String },
        yearOfCompletion: { type: Number },
        score: { type: String }, // percentage or CGPA
        status: {
          type: String,
          enum: ["completed", "ongoing"],
          default: "completed",
        },
        _id: false,
      },
    ],
  },

  // Social links
  social: [
    {
      platform: { type: String, required: true }, // e.g., LinkedIn, GitHub
      url: { type: String, required: true },
      _id: false,
    },
  ],

  // Skills
  skills: { type: [String] },

  // Projects
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String },
      github: { type: String },
      deployed: { type: String },
      media: [{ type: String }], // images or video URLs
      _id: false,
    },
  ],

  // Work Experience
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      description: { type: String },
      _id: false,
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: { type: String, required: true },
      role: { type: String },
      feedback: { type: String, required: true },
      _id: false,
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
