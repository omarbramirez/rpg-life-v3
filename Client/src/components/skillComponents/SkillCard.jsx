import { pathValidator } from "../../controllers/skillscontrollers";

function SkillCard({ skill, action, formData, handleChange }) {
  return (
    <div>
      {skill ? (
        <ul key={`skill-${skill.title}`}>
          <li>
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
              <h3>{skill.title}</h3>
            )}
          </li>
          <li>
            <ul>
              <li>
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
                  <h4>{skill.level}</h4>
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
                      <option value="">Select Category</option>
                      <option value="Hard Skills">Hard Skills</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                ) : (
                  <h4>{skill.category}</h4>
                )}
              </li>
              <li>
                <img
                  className="skill_icon"
                  src={`${pathValidator(skill.icon, "icons")}`}
                  alt={`${skill.title}-icon`}
                />
              </li>
            </ul>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default SkillCard;
