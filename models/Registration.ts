import mongoose, { Schema, models, model } from "mongoose";

const RegistrationSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations
RegistrationSchema.index(
  { studentId: 1, eventId: 1 },
  { unique: true }
);

const Registration =
  models.Registration ||
  model("Registration", RegistrationSchema);

export default Registration;