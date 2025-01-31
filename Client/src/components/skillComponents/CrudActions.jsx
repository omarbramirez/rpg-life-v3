import { handleCurrentSkillDeleting } from "../../controllers/skillscontrollers";

function CrudActions({ setCrudAction, skill, setTotalSkills }) {
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction("ADD");
        }}
      >
        Add
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction("EDIT");
        }}
      >
        Edit
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction("REMOVE");
          handleCurrentSkillDeleting(skill, setTotalSkills);
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default CrudActions;
