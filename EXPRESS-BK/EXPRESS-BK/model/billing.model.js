import mongoose from "mongoose";

const billingSchema = mongoose.Schema(
{
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    },

    roomNumber: Number,

    roomRate: Number,        // per night
    numberOfNights: Number,

    roomCharges: Number,     // roomRate * numberOfNights

    extraServices: [
        {
            serviceName: String,   // e.g., food, laundry
            price: Number,
            quantity: Number,
            total: Number
        }
    ],

    serviceCharges: Number,  // sum of all extra services

    tax: Number,
    discount: Number,

    totalAmount: Number,     // final amount after tax/discount

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "card", "online"]
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Billing", billingSchema);