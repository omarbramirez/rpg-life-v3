import {
  getSkillsNumber,
  addNewskill,
  deleteCurrentSkill,
  updateCurrentSkill,
} from "../routes/skills";
import { getOneSkill } from "../routes/skills";

export const handlePagination = async (
  direction,
  page,
  setCurrentPage,
  totalSkills
) => {
  const newLimit = totalSkills;
  let newPage = page;
  if (direction === "NEXT" && newPage < newLimit) {
    newPage++;
  }
  if (direction === "BACK" && newPage > 0) {
    newPage--;
  }
  setCurrentPage(newPage);
};

export const handleNewSkillCreation = async (newSkill, setTotalSkills) => {
  const success = await addNewskill(newSkill);
  if (success) {
    const newLimit = await handlePaginationLimit();
    setTotalSkills(newLimit);
  }
};

export const handleCurrentSkillDeleting = async (skill, setTotalSkills) => {
  const success = await deleteCurrentSkill(skill);
  if (success) {
    const newLimit = await handlePaginationLimit();
    setTotalSkills(newLimit);
  }
};

export const handleCurrentSkillUpdating = async (
  formData,
  skill,
  currentSkill,
  setCrudAction,
  setSkill
) => {
  let fieldsModified = {};
  for (const [key, value] of Object.entries(formData)) {
    if (skill[key] !== value && key !== "title") {
      fieldsModified[key] = value;
    }
    if (key === "title") {
      fieldsModified[key] = skill.title;
      fieldsModified["new_title"] = value;
    }
  }
  if (Object.keys(fieldsModified).length !== 0) {
    const success = await updateCurrentSkill(fieldsModified);
    if (success) {
      setCrudAction(null);
      getOneSkill(currentSkill).then((data) => {
        setSkill(data[0]);
      });
    }
  }
};

export const pathValidator = (src, folder) => {
  const urlRegex = /^https?:\/\/[^\s]+$/;
  let validatedPath = null;
  urlRegex.test(src)
    ? (validatedPath = src)
    : (validatedPath = `assets/${folder}/${src}`);
  return validatedPath;
};

export const imgValidator = (newSkill) => {
  let defaultImg = "mission.jpg";
  const imgRegex = /\.(jpg|jpeg|png|svg)$/i;
  if (!newSkill["img"] || !imgRegex.test(newSkill["img"])) {
    newSkill["img"] = defaultImg;
  }
};

export const iconAssignment = (newSkill) => {
  let icon = newSkill["category"].toLowerCase().replace(/\s+/g, "-");
  newSkill["icon"] = icon + ".svg";
};

const handlePaginationLimit = async () => {
  const data = await getSkillsNumber();
  const newLimit = data.total - 1;
  return newLimit;
};
