import { useState, useEffect } from "react";
import { handleNewQuestCreation } from "../../controllers/questscontrollers";
import { getAllSkillsTitles } from "../../routes/skills";
function QuestForm({ setTotalQuests, setCrudAction }) {
  const [skillsTitles, setSkillsTitles] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    SXP: 0,
    CXP: 0,
    category: "",
    skill: "",
    public: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleNewQuestCreation(formData, setTotalQuests);
    setFormData({
      title: "",
      description: "",
      status: "",
      SXP: 0,
      CXP: 0,
      category: "",
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
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value=" ">Select Category</option>
          <option value="Hard Skills">Hard Skills</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
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
      <div>
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
                  <option key={`skill-${skill.title}`} value={`${skill.title}`}>
                    {skill.title}
                  </option>
                ))
              : null}
          </select>
        </div>
        <label htmlFor="SXP">SXP:</label>
        <input
          type="number"
          id="SXP"
          name="SXP"
          value={formData.SXP >= 0 ? formData.SXP : 0}
          onChange={handleChange}
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
    </form>
  );
}

export default QuestForm;
