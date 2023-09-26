import mongoose from "mongoose";

const MoodCardSchema = new mongoose.Schema(
  {
    activeEmoji: {
      type: Array,
    },

    conditionsScores: {
      type: Object,
    },
    dayNote: {
      type: String,
    },

    createdAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MoodCard", MoodCardSchema);
