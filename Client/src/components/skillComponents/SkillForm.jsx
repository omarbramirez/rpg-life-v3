import { useEffect, useState } from "react";
import {
  handleNewSkillCreation,
  handleCurrentSkillUpdating,
  imgValidator,
  iconAssignment,
} from "../../controllers/skillscontrollers";
function SkillForm({
  action,
  skill,
  setTotalSkills,
  currentSkill,
  setCrudAction,
  setSkill,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: 0,
    category: "",
    public: false,
    img: "",
    icon: "",
  });

  useEffect(() => {
    if (skill !== undefined) {
      const { title, description, level, category, img, icon } = skill;
      setFormData({
        title: title,
        description: description,
        level: level,
        category: category,
        img: img,
        icon: icon,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    imgValidator(formData);
    iconAssignment(formData);
    console.log(formData);
    if (action === "ADD") {
      handleNewSkillCreation(formData, setTotalSkills);
    }
    if (action === "EDIT") {
      handleCurrentSkillUpdating(
        formData,
        skill,
        currentSkill,
        setCrudAction,
        setSkill
      );
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
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{action}</h2>
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
          value={formData.category || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Hard Skills">Hard Skills</option>
          <option value="Soft Skills">Soft Skills</option>
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
      {/* AQUI TODAVIA TENGO QUE CREAR UNA FUNCION PARA SUBIR Y ALMACENAR IMAGENES */}
      <div>
        <label htmlFor="img">Image Path:</label>
        <textarea
          name="img"
          id="img"
          value={formData.img || ""}
          onChange={handleChange}
        />
      </div>
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
    </form>
  );
}

export default SkillForm;
