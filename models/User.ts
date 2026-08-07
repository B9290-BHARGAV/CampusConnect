import { Schema, models, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
      enum: ["student", "faculty", "admin", null],
      default: null,
    },

    department: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
      default: null,
    },

    enrollmentNumber: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    registeredEvents: [
      {
        type: Types.ObjectId,
        ref: "Event",
      },
    ],

    savedResources: [
      {
        type: Types.ObjectId,
        ref: "Resource",
      },
    ],

    connections: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;