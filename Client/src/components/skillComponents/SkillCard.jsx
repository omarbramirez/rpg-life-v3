import { pathValidator } from "../../controllers/skillscontrollers";

function SkillCard({ skill }) {
  return (
    <div>
      {skill ? (
        <ul key={`skill-${skill.title}`}>
          <li>
            <h3>{skill.title}</h3>
          </li>
          <li>
            <h4>{skill.level}</h4>
            <img
              className="skill_icon"
              src={`${pathValidator(skill.icon, "icons")}`}
              alt={`${skill.title}-icon`}
            />
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default SkillCard;
