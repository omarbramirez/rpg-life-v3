import { useEffect, useState } from "react";
import SkillCard from "../components/skillComponents/SkillCard";
import SkillItem from "../components/skillComponents/SkillItem";
import Pagination from "../components/skillComponents/Pagination";
import { getOneSkill } from "../routes/skills";
import CrudActions from "../components/skillComponents/CrudActions";
import SkillForm from "../components/skillComponents/SkillForm";

function Skills() {
  const initialSkill = localStorage.getItem("currentSkill") || 0;
  const initialTotalSkills = localStorage.getItem("currentTotal") || 1;

  const [skill, setSkill] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(parseInt(initialSkill));
  const [crudAction, setCrudAction] = useState(null);
  const [totalSkills, setTotalSkills] = useState(parseInt(initialTotalSkills));

  useEffect(() => {
    getOneSkill(currentSkill).then((data) => {
      setSkill(data[0]);
    });
    localStorage.setItem("currentSkill", currentSkill.toString());
  }, [currentSkill]);

  useEffect(() => {
    if (crudAction === "ADD") {
      setCurrentSkill(totalSkills);
    }
    if (crudAction === "REMOVE") {
      let newPage = currentSkill - 1 < 0 ? 0 : currentSkill - 1;
      setCurrentSkill(newPage);
      getOneSkill(currentSkill).then((data) => {
        setSkill(data[0]);
      });
    }
    localStorage.setItem("currentTotal", totalSkills.toString());
    setCrudAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSkills]);

  return (
    <section>
      <h2>{currentSkill}</h2>
      <Pagination
        setCurrentSkill={setCurrentSkill}
        currentSkill={currentSkill}
        totalSkills={totalSkills}
      />
      <CrudActions
        setCrudAction={setCrudAction}
        skill={skill}
        setCurrentSkill={setCurrentSkill}
        setTotalSkills={setTotalSkills}
        currentSkill={currentSkill}
      />

      <h1>Skills</h1>
      {crudAction === "ADD" ? (
        <SkillForm
          action={crudAction}
          setCurrentSkill={setCurrentSkill}
          setTotalSkills={setTotalSkills}
        />
      ) : null}
      {crudAction === "EDIT" ? (
        <SkillForm
          action={crudAction}
          skill={skill}
          setCurrentSkill={setCurrentSkill}
          currentSkill={currentSkill}
          setCrudAction={setCrudAction}
          setSkill={setSkill}
        />
      ) : null}
      <SkillItem skill={skill} />
      <SkillCard skill={skill} />
    </section>
  );
}

export default Skills;
