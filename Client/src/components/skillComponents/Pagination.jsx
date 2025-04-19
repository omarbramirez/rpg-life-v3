import { handlePagination } from "../../controllers/skillscontrollers";

function Pagination({ setCurrentSkill, currentSkill, totalSkills }) {
  var newSkill = currentSkill;

  return (
    <>
      <button
        className="button sub--button"
        onClick={(event) => {
          event.preventDefault();
          handlePagination("BACK", newSkill, setCurrentSkill, totalSkills);
        }}
      >
        BACK
      </button>
      <button
        className="button sub--button"
        onClick={(event) => {
          event.preventDefault();
          handlePagination("NEXT", newSkill, setCurrentSkill, totalSkills);
        }}
      >
        NEXT
      </button>
    </>
  );
}

export default Pagination;
