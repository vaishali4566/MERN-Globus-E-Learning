import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { 
    type: String, 
    enum: ["student", "trainer", "admin"], 
    default: "student" 
  },

  bio: { type: String },
  skills: { type: [String], default: [] },

  linkedin: { type: String },   // added
  github: { type: String },     // added
  twitter: { type: String },    // added

  permissions: { type: [String], default: [] }, 

  // Profile photo
  profilePhoto: { type: String, default: null },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model("User", userSchema);
