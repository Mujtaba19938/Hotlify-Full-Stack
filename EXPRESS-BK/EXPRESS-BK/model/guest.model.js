import mongoose from "mongoose"

const guestSchema = mongoose.Schema(
{
    guestNumber: Number,
    firstName: String,
    lastName: String,

    email: String,
    phone: String,

    gender: String,
    dateOfBirth: Date,

    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,

    nationality: String,
    idCardNumber: String,
    passportNumber: String,

    preferences: String,

    emergencyContactName: String,
    emergencyContactPhone: String,

    profileImage: String,

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
},
{
    timestamps: true
}
)

export default mongoose.model('guest', guestSchema)