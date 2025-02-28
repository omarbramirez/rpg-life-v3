import {
  handleNewSkillCreation,
  imgValidator,
  iconAssignment,
} from "../../controllers/skillscontrollers";
import { useState } from "react";
function SkillForm({ action, setTotalSkills, setAction }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: 0,
    category: "",
    public: false,
    img: "",
    icon: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    imgValidator(formData);
    iconAssignment(formData);
    if (action === "ADD") {
      handleNewSkillCreation(formData, setTotalSkills);
    }
    setFormData({
      title: "",
      description: "",
      level: 0,
      category: "",
      public: false,
      img: "",
      icon: "",
    });
  };

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
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="number"
          id="level"
          name="level"
          value={formData.level >= 0 ? formData.level : 0}
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
          <option value="">Select Category</option>
          <option value="Hard Skills">Hard Skills</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div>
        <label htmlFor="public">Public:</label>
        <input
          type="checkbox"
          id="public"
          name="public"
          checked={formData.public || ""}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="img">Image Path:</label>
        <textarea
          name="img"
          id="img"
          value={formData.img || ""}
          onChange={handleChange}
        />
      </div> */}
      {/* <div>
        <label htmlFor="icon">Icon Path:</label>
        <textarea
          name="icon"
          id="icon"
          value={formData.icon || ""}
          onChange={handleChange}
        />
      </div> */}
      <button type="submit">Send</button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setAction(null);
        }}
      >
        Close
      </button>
    </form>
  );
}

export default SkillForm;
