import { pathValidator } from "../../controllers/skillscontrollers";

function SkillItem({ skill }) {
  return (
    <>
      {skill ? (
        <ul key={`skill-${skill.title}`}>
          <li>
            <img
              className="skill_img"
              src={`${pathValidator(skill.img, "imgs")}`}
              alt={`${skill.title}-img`}
            />
          </li>
          <li>
            <p>{skill.description}</p>
          </li>
        </ul>
      ) : null}
    </>
  );
}

export default SkillItem;
