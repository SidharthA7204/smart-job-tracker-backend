const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },

    // 🤖 AI FIELDS (ADD HERE)
    aiScore: {
      type: Number,
      default: null,
    },
    aiSuggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

// ✅ SAFE EXPORT
module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema)
