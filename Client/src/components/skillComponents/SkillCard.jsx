import { pathValidator } from "../../controllers/skillscontrollers";

function SkillCard({ skill, action, formData, handleChange }) {
  return (
    <div>
      {skill ? (
        <ul key={`skill-${skill.title}`} className="info">
          <li className="skill--info">
            {action === "EDIT" ? (
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
            ) : (
              <h3 className="skill--info--element">{skill.title}</h3>
            )}
            {action === "EDIT" ? (
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
            ) : (
              <h3 className="skill--info--element">{skill.level}</h3>
            )}
          </li>
          <li>
            {action === "EDIT" ? (
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
            ) : (
              <div className="skill--info">
                <h4 className="skill--info--element">{skill.category}</h4>
                <img
                  className="skill_icon skill--info--element"
                  src={`${pathValidator(skill.icon, "icons")}`}
                  alt={`${skill.title}-icon`}
                />
              </div>
            )}
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default SkillCard;
