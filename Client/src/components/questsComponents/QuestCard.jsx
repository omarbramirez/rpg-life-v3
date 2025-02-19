import { useEffect, useState } from "react";
import CrudActions from "../CrudActions";
import {
  handleCurrentQuestDeleting,
  handleCurrentQuestUpdating,
} from "../../controllers/questscontrollers";
import { getAllSkillsTitles } from "../../routes/skills";
function QuestCard({
  quest,
  setTotalQuests,
  setDataUpdated,
  setCrudAction,
  action,
  setSelectedQuest,
}) {
  const [skillsTitles, setSkillsTitles] = useState(null);
  const [formData, setFormData] = useState({
    title: quest.title,
    description: quest.description,
    status: quest.status,
    SXP: quest.SXP,
    CXP: quest.CXP,
    category: quest.category,
    skill: quest.skill,
    public: quest.public,
  });

  useEffect(() => {
    getAllSkillsTitles().then((data) => {
      setSkillsTitles(data);
    });
  }, []);

  // const [action, setAction] = useState(null);

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
            {action === "EDIT" ? (
              <div>
                <select
                  name="category"
                  id="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  required
                >
                  <option value=" ">Select Category</option>
                  <option value="Hard Skills">Hard Skills</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            ) : (
              <h4>{quest.category}</h4>
            )}
          </li>
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
            <li>{quest.description}</li>
          )}

          <li>
            {action === "EDIT" ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                Enviar
              </button>
            ) : (
              <CrudActions
                setAction={setCrudAction}
                element={quest}
                setTotalElements={setTotalQuests}
                handleCurrentElementDeleting={handleCurrentQuestDeleting}
                setSelectedElementOnClick={setSelectedQuest}
              />
            )}
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default QuestCard;
