import { pathValidator } from "../../controllers/skillscontrollers";

function SkillItem({ skill, action, formData, handleChange }) {
  return (
    <>
      {skill ? (
        <ul key={`skill-${skill.title}`}>
          {/* <li>
            <img
              className="skill_img"
              src={`${pathValidator(skill.img, "imgs")}`}
              alt={`${skill.title}-img`}
            />
          </li> */}
          <li>
            {action === "EDIT" ? (
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
            ) : (
              <p>{skill.description}</p>
            )}
          </li>
        </ul>
      ) : null}
    </>
  );
}

export default SkillItem;
