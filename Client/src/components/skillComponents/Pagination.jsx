import { handlePagination } from "../../controllers/skillscontrollers";

function Pagination({ setCurrentSkill, currentSkill, totalSkills }) {
  var newSkill = currentSkill;

  return (
    <>
      <button
        onClick={(event) => {
          event.preventDefault();
          handlePagination("BACK", newSkill, setCurrentSkill, totalSkills);
        }}
      >
        Anterior
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          handlePagination("NEXT", newSkill, setCurrentSkill, totalSkills);
        }}
      >
        Siguiente
      </button>
    </>
  );
}

export default Pagination;
