import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const getAllSkills = async () => {
  try {
    const response = await axios.get(`${baseURL}/skills`);
    const allSkills = response.data;
    return allSkills;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const getOneSkill = async (page) => {
  try {
    const response = await axios.get(`${baseURL}/get-one-skill?page=${page}`);
    const skill = response.data;
    return skill;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const getSkillsNumber = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-skills-number`);
    const skillsNumber = response.data;
    return skillsNumber;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const addNewskill = async (newSkill) => {
  try {
    const response = await axios.post(`${baseURL}/add-skill`, newSkill);
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const deleteCurrentSkill = async (currentSkill) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-skill`, {
      data: currentSkill,
    });
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};

export const updateCurrentSkill = async (fieldsModified) => {
  try {
    const response = await axios.patch(`${baseURL}/update-skill`, {
      data: fieldsModified,
    });
    const success = response.data;
    return success;
  } catch (err) {
    console.error("Internal server error:", err);
  }
};
