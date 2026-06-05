import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
{
    guestName: String,
    guestEmail: String,
    guestPhone: String,

    roomType: String,
    roomNumber: Number,

    checkInDate: Date,
    checkOutDate: Date,

    numberOfGuests: Number,

    reservationStatus: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },

    totalAmount: Number,
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    specialRequests: String
},
{
    timestamps: true
}
);

export default mongoose.model("Reservation", reservationSchema);