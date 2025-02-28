import { useState, useEffect } from "react";
import { handleNewQuestCreation } from "../../controllers/questscontrollers";
import { getAllSkillsTitles } from "../../routes/skills";
function QuestForm({ setTotalQuests, setCrudAction }) {
  const [skillsTitles, setSkillsTitles] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
    SXP: 0,
    CXP: 0,
    skill: "",
    public: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewQuestCreation(formData, setTotalQuests);
    setFormData({
      title: "",
      description: "",
      completed: false,
      SXP: 0,
      CXP: 0,
      skill: "",
      public: false,
    });
    setCrudAction(null);
  };
  useEffect(() => {
    getAllSkillsTitles().then((data) => {
      console.log(data);
      setSkillsTitles(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "level"
          ? Math.max(0, Number(value))
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="CXP">CXP:</label>
        <input
          type="number"
          id="CXP"
          name="CXP"
          value={formData.CXP > 0 ? formData.CXP : 0}
          onChange={handleChange}
          required
        />
      </div>
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
                <option key={`skill-${skill.title}`} value={`${skill.title}`}>
                  {skill.title}
                </option>
              ))
            : null}
        </select>
      </div>
      <div>
        <label htmlFor="SXP">SXP:</label>
        <input
          type="number"
          id="SXP"
          name="SXP"
          value={formData.SXP > 0 ? formData.SXP : 0}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Send</button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction(null);
        }}
      >
        Close
      </button>
    </form>
  );
}

export default QuestForm;
