// FeedbackEngine.js
import { Feedback } from '../../models/schemas.js';

export const getUserFeedbackMap = async (userId) => {
  const feedbackList = await Feedback.find({ userId });
  const map = {};
  for (const f of feedbackList) {
    map[f.itemId] = f.rating;
  }
  return map;
};
