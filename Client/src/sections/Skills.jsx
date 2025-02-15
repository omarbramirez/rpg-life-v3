import { useEffect, useState } from "react";
import SkillCard from "../components/skillComponents/SkillCard";
import SkillItem from "../components/skillComponents/SkillItem";
import Pagination from "../components/skillComponents/Pagination";
import { getOneSkill } from "../routes/skills";
import { handleCurrentSkillDeleting } from "../controllers/skillscontrollers";
import CrudActions from "../components/CrudActions";
import SkillForm from "../components/skillComponents/SkillForm";

function Skills() {
  const initialSkill = localStorage.getItem("currentSkill") || 0;
  const initialTotalSkills = localStorage.getItem("currentTotal") || 1;

  const [skill, setSkill] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(parseInt(initialSkill));
  const [crudAction, setCrudAction] = useState(null);
  const [totalSkills, setTotalSkills] = useState(parseInt(initialTotalSkills));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: 0,
    category: "",
    public: false,
    img: "",
    icon: "",
  });

  //tengo que hacer una inizializacion de totalskills

  useEffect(() => {
    if (crudAction === "EDIT") {
      setFormData({
        title: skill.title,
        description: skill.description,
        level: skill.level,
        category: skill.category,
        public: skill.public,
        img: skill.img,
        icon: skill.icon,
      });
    }
  }, [crudAction]);
  useEffect(() => {
    getOneSkill(currentSkill).then((data) => {
      setSkill(data[0]);
    });
    localStorage.setItem("currentSkill", currentSkill.toString());
    setCrudAction(null);
  }, [currentSkill]);
  //crear boton de submit para update
  useEffect(() => {
    if (crudAction === "ADD") {
      setCurrentSkill(totalSkills);
    }
    if (crudAction === "REMOVE") {
      let newPage = currentSkill - 1 < 0 ? 0 : currentSkill - 1;
      setCurrentSkill(newPage);
    }
    localStorage.setItem("currentTotal", totalSkills.toString());
    setCrudAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSkills]);

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
    <section>
      <Pagination
        setCurrentSkill={setCurrentSkill}
        currentSkill={currentSkill}
        totalSkills={totalSkills}
      />
      <CrudActions
        setAction={setCrudAction}
        element={skill}
        setTotalElements={setTotalSkills}
        handleCurrentElementDeleting={handleCurrentSkillDeleting}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          setCrudAction("ADD");
        }}
      >
        Add
      </button>

      <h1>Skills</h1>
      {crudAction === "ADD" ? (
        <SkillForm
          action={crudAction}
          setCurrentSkill={setCurrentSkill}
          setTotalSkills={setTotalSkills}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      ) : null}
      <SkillCard
        skill={skill}
        action={crudAction}
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
      />
      <SkillItem
        skill={skill}
        action={crudAction}
        formData={formData}
        handleChange={handleChange}
      />
    </section>
  );
}

export default Skills;
