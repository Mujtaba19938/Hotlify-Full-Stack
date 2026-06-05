import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    roomType: {
      type: String, // e.g., Single, Double, Suite
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "occupied", "cleaning", "maintenance"],
      default: "available",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Booking info
    currentGuestName: {
      type: String,
      default: null,
    },

    checkInDate: {
      type: Date,
      default: null,
    },

    checkOutDate: {
      type: Date,
      default: null,
    },

    // Optional extra details
    description: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);