import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const getUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-user`);
    const user = response.data;
    return user;
  } catch (err) {
    console.error("Internal server error for getUser():", err);
  }
};
export const getSkillList = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-skill-list`);
    const skillList = response.data;
    return skillList;
  } catch (err) {
    console.error("Internal server error for getSkillList():", err);
  }
};

export const getActiveQuest = async (title) => {
  try {
    const response = await axios.get(
      `${baseURL}/get-active-quest?title=${title}`
    );
    const activeQuest = response.data;
    return activeQuest;
  } catch (err) {
    console.error("Internal server error for getActiveQuest():", err);
  }
};

export const addCXPToStats = async (CXP) => {
  try {
    await axios.patch(`${baseURL}/add-CXP-to-stats`, {
      data: { CXP: CXP },
    });
  } catch (err) {
    console.error("Internal server error for getActiveQuest():", err);
  }
};

export const addSXPToSkill = async (SXP, skill) => {
  try {
    await axios.patch(`${baseURL}/add-SXP-to-skill`, {
      data: { SXP: SXP, skill: skill },
    });
  } catch (err) {
    console.error("Internal server error for addSXPToSkill():", err);
  }
};

export const levelUp = async () => {
  try {
    const response = await axios.patch(`${baseURL}/level-up`);
  } catch (err) {
    console.error("Internal server error for levelUp():", err);
  }
};

export const updateElement = async (formData) => {
  try {
    await axios.patch(`${baseURL}/update-element`, {
      data: formData,
    });
  } catch (err) {
    console.error("Internal server error for updateElement():", err);
  }
};
