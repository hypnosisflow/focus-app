import { body } from "express-validator";

export const moodCardValidation = [
  body("activeEmoji").isArray(),
  body("conditionsScores").isObject(),
  body("dayNote").isString(),
  body("createdAt").isString(),
];
