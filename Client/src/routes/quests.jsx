import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const getActiveQuests = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-active-quests`);
    const activeQuests = response.data;
    return activeQuests;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const getCompletedQuests = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-completed-quests`);
    const completedQuests = response.data;
    return completedQuests;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};
