import { useState } from "react";
import { handleNewQuestCreation } from "../../controllers/questscontrollers";
function QuestForm({ setTotalQuests, setCrudAction }) {
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
          <option value="unknown">Select Category</option>
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
        <label htmlFor="skill">Skill:</label>
        <input
          type="text"
          id="skill"
          name="skill"
          value={formData.skill}
          onChange={handleChange}
        />
      </div>
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
