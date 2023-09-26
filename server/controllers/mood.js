import MoodCard from "../models/MoodCard.js";

export const getAllMoodCards = async (req, res) => {
  try {
    const moodcards = await MoodCard.find();

    res.json(moodcards);
  } catch (error) {
    res.status(500).json({
      message: `${error}, getAll moodCards error`,
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new MoodCard({
      activeEmoji: req.body.activeEmoji,
      conditionsScores: req.body.conditionsScores,
      dayNote: req.body.dayNote,
      createdAt: req.body.createdAt,
    });

    const moodCard = await doc.save();

    res.json(moodCard);
  } catch (error) {
    res.status(500).json({
      message: `${error}, create moodCard error`,
    });
  }
};
