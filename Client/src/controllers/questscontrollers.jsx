import {
  getQuestsNumber,
  addNewQuest,
  deleteCurrentQuest,
  updateCurrentQuest,
} from "../routes/quests";

import { addCXPToStats, addSXPToSkill } from "../routes/stats";

export const handleNewQuestCreation = async (newQuest, setTotalQuests) => {
  const success = await addNewQuest(newQuest);
  if (success) {
    const newLimit = handlePaginationLimit();
    setTotalQuests(newLimit);
  }
};

export const handleCurrentQuestDeleting = async (quest, setTotalQuests) => {
  const success = await deleteCurrentQuest(quest);
  if (success) {
    const newLimit = handlePaginationLimit();
    setTotalQuests(newLimit);
  }
};

export const handleCurrentQuestUpdating = async (
  formData,
  quest,
  setAction,
  setDataUpdated
) => {
  let fieldsModified = {};
  for (const [key, value] of Object.entries(formData)) {
    if (quest[key] !== value && key !== "title") {
      fieldsModified[key] = value;
    }
    if (key === "title") {
      fieldsModified[key] = quest.title;
      fieldsModified["new_title"] = value;
    }
  }
  if (Object.keys(fieldsModified).length !== 0) {
    const success = await updateCurrentQuest(fieldsModified);
    if (success) {
      setAction(null);
      setDataUpdated(true);
    }
  }
};

export const handleCurrentQuestCompleting = async (quest, setTotalQuests) => {
  const { title, SXP, skill, CXP } = quest;
  let fieldsModified = { title: title, completed: true };
  const success = await updateCurrentQuest(fieldsModified);
  if (success) {
    await addCXPToStats(CXP);
    await addSXPToSkill(SXP, skill);
    const newLimit = handlePaginationLimit();
    setTotalQuests(newLimit);
  }
};

export const handlePaginationLimit = async () => {
  const data = await getQuestsNumber();
  const newLimit = data.total - 1;
  return newLimit;
};
