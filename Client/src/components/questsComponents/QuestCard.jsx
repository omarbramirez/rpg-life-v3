import { useEffect, useState } from "react";
import CrudActions from "../CrudActions";
import {
  handleCurrentQuestDeleting,
  handleCurrentQuestUpdating,
  handleCurrentQuestCompleting,
} from "../../controllers/questscontrollers";
import { getAllSkillsTitles } from "../../routes/skills";
function QuestCard({
  quest,
  setTotalQuests,
  setDataUpdated,
  setCrudAction,
  action,
  setSelectedQuest,
  selectedQuest,
  completed,
}) {
  const [skillsTitles, setSkillsTitles] = useState(null);
  const [formData, setFormData] = useState({
    title: quest.title,
    description: quest.description,
    completed: false,
    SXP: quest.SXP,
    CXP: quest.CXP,
    skill: quest.skill,
    public: quest.public,
  });

  useEffect(() => {
    getAllSkillsTitles().then((data) => {
      setSkillsTitles(data);
    });
  }, []);

  useEffect(() => {
    setFormData({
      title: quest.title,
      description: quest.description,
      completed: false,
      SXP: quest.SXP,
      CXP: quest.CXP,
      skill: quest.skill,
      public: quest.public,
    });
  }, [selectedQuest]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "level"
          ? Math.max(0, Number(value)) // Evita valores negativos
          : value,
    }));
  };
  const handleSubmit = () => {
    handleCurrentQuestUpdating(formData, quest, setCrudAction, setDataUpdated);
  };

  return (
    <div>
      {quest ? (
        <ul>
          <li>
            {action === "EDIT" ? (
              <div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <h3>{quest.title}</h3>
            )}
          </li>
          {!completed ? (
            <li>
              {action === "EDIT" ? (
                <div>
                  <label htmlFor="CXP">CXP:</label>
                  <input
                    type="number"
                    id="CXP"
                    name="CXP"
                    value={formData.CXP >= 0 ? formData.CXP : 0}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <h4>{quest.CXP}</h4>
              )}
            </li>
          ) : null}
          {!completed ? (
            <li>
              {action === "EDIT" ? (
                <div>
                  <label htmlFor="skill">Skill:</label>
                  <select
                    name="skill"
                    id="skill"
                    value={formData.skill || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Skill</option>
                    {skillsTitles
                      ? skillsTitles.map((skill) => (
                          <option
                            key={`skill-${skill.title}`}
                            value={`${skill.title}`}
                          >
                            {skill.title}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              ) : (
                <h4>{quest.skill}</h4>
              )}
            </li>
          ) : null}

          {!completed ? (
            <li>
              {action === "EDIT" ? (
                <div>
                  <label htmlFor="SXP">SXP:</label>
                  <input
                    type="number"
                    id="SXP"
                    name="SXP"
                    value={formData.SXP >= 0 ? formData.SXP : 0}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <h4>{quest.SXP}</h4>
              )}
            </li>
          ) : null}

          <li>
            {action === "EDIT" ? (
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <p>{quest.description}</p>
            )}
          </li>
          {!completed ? (
            <li>
              {action === "EDIT" ? (
                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Send
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setCrudAction(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  <CrudActions
                    setAction={setCrudAction}
                    element={quest}
                    setTotalElements={setTotalQuests}
                    handleCurrentElementDeleting={handleCurrentQuestDeleting}
                    setSelectedElementOnClick={setSelectedQuest}
                  />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleCurrentQuestCompleting(quest, setTotalQuests);
                    }}
                  >
                    Complete
                  </button>
                </div>
              )}
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}

export default QuestCard;
