import mongoose from "mongoose";

const httpUrl = {
  validator: (value) => !value || /^https?:\/\/\S+$/i.test(value),
  message: "{PATH} must be a valid http(s) URL.",
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String },
  resume: { type: String, validate: httpUrl },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  folio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Folio" },

  education: {
    type: [
      {
        level: { type: String, required: true },
        institution: { type: String, required: true },
        boardOrUniversity: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        yearOfCompletion: { type: Number },
        score: { type: String },
        status: {
          type: String,
          enum: ["Completed", "Ongoing"],
          default: "Completed",
        },
        _id: false,
      },
    ],
  },

  social: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true, validate: httpUrl },
      _id: false,
    },
  ],

  skills: { type: [String] },

  projects: [
    {
      title: { type: String, required: true },
      description: { type: String },
      github: { type: String, validate: httpUrl },
      deployed: { type: String, validate: httpUrl },
      media: [{ type: String }],
      _id: false,
    },
  ],

  experience: [
    {
      _id: false,
      title: { type: String, required: true, trim: true },
      company: { type: String, required: true, trim: true },
      location: { type: String, trim: true },
      from: { type: Date, required: true },
      to: {
        type: Date,
        required: function () {
          return !this.isCurrent;
        },
      },
      isCurrent: {
        type: Boolean,
        default: false,
      },
      description: { type: String, trim: true },
    },
  ],

  testimonials: [
    {
      name: { type: String, required: true },
      role: { type: String },
      feedback: { type: String, required: true },
      _id: false,
    },
  ],
},{timestamps:true});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
