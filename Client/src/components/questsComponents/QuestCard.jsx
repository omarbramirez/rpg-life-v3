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
        <ul className="questCard">
          <li>
            <div>
              {action === "EDIT" ? (
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                />
              ) : (
                <h3 className="quest--title">{quest.title}</h3>
              )}
            </div>
            <div className="questCard--xp">
              <div>
                {!completed ? (
                  <>
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
                      <h4 className="quest--points">CXP: {quest.CXP}</h4>
                    )}
                  </>
                ) : null}
              </div>

              <div>
                {!completed ? (
                  <div>
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
                      <h4 className="quest--points">SXP: {quest.SXP}</h4>
                    )}
                  </div>
                ) : null}
              </div>
              <ul>
                <li>
                  <div>
                    {!completed ? (
                      <div>
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
                      </div>
                    ) : null}
                  </div>
                </li>
              </ul>
            </div>
            <div>
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
            </div>
          </li>

          {!completed ? (
            <li>
              {action === "EDIT" ? (
                <div>
                  <button
                    className="button sub--button"
                    onClick={(event) => {
                      event.preventDefault();
                      handleSubmit();
                    }}
                  >
                    SEND
                  </button>
                  <button
                    className="button sub--button"
                    onClick={(event) => {
                      event.preventDefault();
                      setCrudAction(null);
                    }}
                  >
                    X
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
                    className="button sub--button"
                  >
                    COMPLETE
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
