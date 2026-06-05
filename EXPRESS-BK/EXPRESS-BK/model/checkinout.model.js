import mongoose from "mongoose";

const checkInOutSchema = mongoose.Schema(
{
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    },

    roomNumber: Number,

    checkInTime: Date,
    checkOutTime: Date,

    actualGuests: Number,

    keyIssued: {
        type: Boolean,
        default: false
    },

    billingAmount: Number,

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    roomStatus: {
        type: String,
        enum: ["available", "occupied", "cleaning"],
        default: "available"
    }
},
{
    timestamps: true
}
);

export default mongoose.model("CheckInOut", checkInOutSchema);