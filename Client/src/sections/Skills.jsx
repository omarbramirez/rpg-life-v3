import { useEffect, useState } from "react";
import SkillCard from "../components/skillComponents/SkillCard";
import SkillItem from "../components/skillComponents/SkillItem";
import Pagination from "../components/skillComponents/Pagination";
import { getOneSkill } from "../routes/skills";
import {
  handleCurrentSkillDeleting,
  handleCurrentSkillUpdating,
  imgValidator,
  iconAssignment,
} from "../controllers/skillscontrollers";
import CrudActions from "../components/CrudActions";
import SkillForm from "../components/skillComponents/SkillForm";

function Skills({ userName }) {
  const initialSkill = localStorage.getItem("currentSkill") || 0;
  const initialTotalSkills = localStorage.getItem("currentTotal") || 1;

  const [skill, setSkill] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(parseInt(initialSkill));
  const [crudAction, setCrudAction] = useState(null);
  const [totalSkills, setTotalSkills] = useState(parseInt(initialTotalSkills));
  const [dataUpdated, setDataUpdated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: 0,
    category: "",
    public: false,
    img: "",
    icon: "",
  });

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
      if (newPage === 0) {
        getOneSkill(0).then((data) => {
          setSkill(data[0]);
        });
      }
      setCurrentSkill(newPage);
      localStorage.setItem("currentSkill", currentSkill.toString());
      setCrudAction(null);
    }
    localStorage.setItem("currentTotal", totalSkills.toString());
    setCrudAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSkills]);

  useEffect(() => {
    if (dataUpdated === true) {
      getOneSkill(currentSkill).then((data) => {
        setSkill(data[0]);
      });
      setDataUpdated(false);
    }
  }, [dataUpdated]);

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

  const handleSubmit = () => {
    imgValidator(formData);
    iconAssignment(formData);
    console.log("sumbitting");
    if (crudAction === "EDIT") {
      handleCurrentSkillUpdating(
        formData,
        skill,
        setCrudAction,
        setDataUpdated
      );
    }
    setFormData({
      title: "",
      description: "",
      level: 0,
      category: "",
      public: false,
      img: "",
      icon: "",
    });
  };

  return (
    <>
      {crudAction === "ADD" ? (
        <SkillForm
          action={crudAction}
          setCurrentSkill={setCurrentSkill}
          setTotalSkills={setTotalSkills}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          setAction={setCrudAction}
        />
      ) : null}
      <div id="pagination">
        <Pagination
          setCurrentSkill={setCurrentSkill}
          currentSkill={currentSkill}
          totalSkills={totalSkills}
        />
      </div>
      <div className="section" id="skills">
        <section className="skills--card">
          <div className="info">
            <h2 className="section--title" id="skills--title">
              SKILLS
            </h2>
            <h4 className="username">{userName}</h4>
            <button
              className="button sub--button"
              id="button--add"
              onClick={(event) => {
                event.preventDefault();
                setCrudAction("ADD");
              }}
            >
              ADD NEW SKILL
            </button>
          </div>
          <SkillCard
            skill={skill}
            action={crudAction}
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </section>
        <section className="skills--item">
          <SkillItem
            skill={skill}
            action={crudAction}
            formData={formData}
            handleChange={handleChange}
          />

          <div>
            {crudAction === "EDIT" ? null : (
              <CrudActions
                setAction={setCrudAction}
                element={skill}
                setTotalElements={setTotalSkills}
                handleCurrentElementDeleting={handleCurrentSkillDeleting}
              />
            )}
            {crudAction === "EDIT" ? (
              <div>
                <button
                  className="button sub--button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  SEND
                </button>
                <button
                  className="button sub--button"
                  onClick={(event) => {
                    event.preventDefault();
                    setCrudAction(null);
                  }}
                >
                  X
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}

export default Skills;
