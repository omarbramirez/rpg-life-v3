import { useState } from "react";
import CrudActions from "../CrudActions";
import {
  handleCurrentQuestDeleting,
  handleCurrentQuestUpdating,
} from "../../controllers/questscontrollers";
function QuestCard({ quest, setTotalQuests, completed, setDataUpdated }) {
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

  const [action, setAction] = useState(null);
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
    handleCurrentQuestUpdating(formData, quest, setAction, setDataUpdated);
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
                  <option value="unknown">Select Category</option>
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
                <label htmlFor="title">CXP:</label>
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
                <label htmlFor="title">Skill:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.skill || ""}
                  onChange={handleChange}
                />
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

          {!completed ? (
            <li>
              {action !== null ? (
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
                  setAction={setAction}
                  element={quest}
                  setTotalElements={setTotalQuests}
                  handleCurrentElementDeleting={handleCurrentQuestDeleting}
                />
              )}
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}

export default QuestCard;
