import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
{
    billingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing"
    },

    invoiceNumber: String,

    guestName: String,
    guestEmail: String,

    issueDate: Date,

    items: [
        {
            description: String,   // room, food, etc.
            amount: Number
        }
    ],

    subtotal: Number,
    tax: Number,
    discount: Number,

    totalAmount: Number,

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    isEmailSent: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Invoice", invoiceSchema);