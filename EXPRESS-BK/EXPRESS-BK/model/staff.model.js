import mongoose from "mongoose"

const staffSchema = mongoose.Schema(
{
    staffNumber: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,

    role: {
        type: String,
        enum: ["manager", "receptionist", "housekeeping", "maintenance", "admin"],
        default: "receptionist"
    },

    accessLevel: String,

    username: String,
    password: String,

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

export default mongoose.model('staff', staffSchema)