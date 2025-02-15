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

export const getQuestsNumber = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-quests-number`);
    const questsNumber = response.data;
    return questsNumber;
  } catch (err) {
    console.error("Internal server error for getQuestsNumber():", err);
  }
};

export const addNewQuest = async (newQuest) => {
  try {
    const response = await axios.post(`${baseURL}/add-quest`, newQuest);
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error for addNewQuest():", err);
  }
};

export const deleteCurrentQuest = async (currentQuest) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-quest`, {
      data: currentQuest,
    });
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const updateCurrentQuest = async (fieldsModified) => {
  console.log("uwu", fieldsModified);
  try {
    const response = await axios.patch(`${baseURL}/update-quest`, {
      data: fieldsModified,
    });
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error for updateCurrentQuest():", err);
  }
};
