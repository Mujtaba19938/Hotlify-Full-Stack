import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema(
{
    roomNumber: Number,

    reportedBy: String,   // guest or staff name

    issueDescription: String,

    issueType: {
        type: String,
        enum: ["electrical", "plumbing", "furniture", "other"]
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    status: {
        type: String,
        enum: ["reported", "in-progress", "resolved"],
        default: "reported"
    },

    assignedTo: String,   // technician name

    resolutionNotes: String,

    reportedAt: {
        type: Date,
        default: Date.now
    },

    resolvedAt: Date
},
{
    timestamps: true
}
);

export default mongoose.model("Maintenance", maintenanceSchema);