import mongoose from "mongoose";

const housekeepingSchema = mongoose.Schema(
{
    roomNumber: Number,

    roomStatus: {
        type: String,
        enum: ["clean", "dirty", "in-progress", "inspection"],
        default: "dirty"
    },

    assignedTo: String,   // staff name or ID

    cleaningDate: Date,

    taskStatus: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },

    notes: String,   // special instructions

    reportedIssues: [
        {
            issue: String,
            severity: {
                type: String,
                enum: ["low", "medium", "high"]
            },
            reportedAt: Date
        }
    ]
},
{
    timestamps: true
}
);

export default mongoose.model("Housekeeping", housekeepingSchema);