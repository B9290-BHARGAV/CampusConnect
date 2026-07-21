import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "google",
    },

    role: {
      type: String,
      enum: ["student", "faculty"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;