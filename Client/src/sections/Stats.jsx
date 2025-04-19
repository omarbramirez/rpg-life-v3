import { useEffect, useState } from "react";
import Avatar from "../components/statsComponents/Avatar";
import ListedSkill from "../components/statsComponents/ListedSkill";
import Countdown from "../components/statsComponents/Countdown";
import ActiveQuest from "../components/statsComponents/ActiveQuest";
import { getSkillList, getUser, levelUp, updateElement } from "../routes/stats";
import { getActiveQuests } from "../routes/quests";
function Stats({ user, setUser }) {
  const [listedSkills, setListedSkills] = useState(null);
  // const [user, setUser] = useState(null);
  const [editableElement, setEditableElement] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    targetDate: "",
    activeQuest: "",
  });
  const [quests, setQuests] = useState(null);
  useEffect(() => {
    getActiveQuests().then((data) => setQuests(data));
  }, []);

  useEffect(() => {
    // getUser()
    //   .then((data) => {
    //     setUser(data);
    //   })
    //   .catch((error) => console.error("Error fetching getUser():", error));

    getSkillList()
      .then((data) => {
        setListedSkills(data);
      })
      .catch((error) => console.error("Error fetching getSkillList():", error));
  }, []);

  const handleLevelingUp = async () => {
    await levelUp();
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching getUser():", error));
  };

  const handleSubmit = async () => {
    const { name, img, targetDate, activeQuest } = formData;
    if (name?.length > 0) {
      await updateElement({ name: name });
      await reset();
    }
    if (targetDate?.length > 0) {
      await updateElement({ targetDate: targetDate });
      await reset();
    }
    if (activeQuest?.length > 0) {
      await updateElement({ activeQuest: activeQuest });
      await reset();
    }
    function reset() {
      setEditableElement(null);
      getUser()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Error fetching getUser():", error));
      setFormData({
        name: "",
        img: "",
        targetDate: "",
        activeQuest: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };

  return (
    <>
      <div className="section" id="stats">
        <section className="stats--characterInfo">
          {user ? (
            <div className="info">
              <h2 className="section--title" id="stats--title">
                STATS
              </h2>
              <ul className="info">
                <li className="info">
                  {editableElement === user?.name ? (
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
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
                            setEditableElement(null);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ) : (
                    user?.name.length > 0 && (
                      <div>
                        <h4 className="username">{user.name}</h4>
                        <button
                          className="button sub--button"
                          onClick={(event) => {
                            event.preventDefault();
                            setEditableElement(`${user.name}`);
                            setFormData({ name: `${user.name}` });
                          }}
                        >
                          EDIT
                        </button>
                      </div>
                    )
                  )}
                </li>
                <li>
                  <table>
                    <tbody>
                      <tr>
                        <th className="vertical--thead">Level</th>
                        <td className="stats--number">{user.level}</td>
                        {user.totalPX > user.nextLevelPX ? (
                          <td>
                            <button
                              className="button sub--button"
                              onClick={(event) => {
                                event.preventDefault();
                                handleLevelingUp();
                              }}
                            >
                              LEVEL UP
                            </button>
                          </td>
                        ) : null}
                      </tr>

                      <tr>
                        <th className="vertical--thead">Next Level</th>
                        <td className="stats--number">{user.nextLevelPX}</td>
                      </tr>
                      <tr>
                        <th className="vertical--thead">PX</th>
                        <td className="stats--number">{user.totalPX}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          ) : null}
        </section>

        <section className="stats--avatar">
          <Avatar userImg={"avatar.png"} />
        </section>
        <section className="stats--progressInfo">
          <div>
            {listedSkills ? (
              <table>
                <thead>
                  <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Lvl</th>
                  </tr>
                </thead>
                <tbody>
                  {listedSkills.map((skill, index) => (
                    <ListedSkill
                      key={`sistedSkill-${skill.title}-${index}`}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
          <div className="">
            <div>
              {editableElement === user?.targetDate ? (
                <div>
                  <input
                    type="date"
                    id="date"
                    name="targetDate"
                    value={formData.targetDate || ""}
                    onChange={handleChange}
                    required
                  />
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
                        setEditableElement(null);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <Countdown targetDate={user?.targetDate} />
                  </div>
                  <button
                    className="button sub--button"
                    onClick={(event) => {
                      event.preventDefault();
                      setEditableElement(`${user.targetDate}`);
                      setFormData({ targetDate: `${user.targetDate}` });
                    }}
                  >
                    EDIT
                  </button>
                </div>
              )}
            </div>
            {editableElement === user?.activeQuest ? (
              <div>
                <select
                  name="activeQuest"
                  id="quest"
                  value={formData.activeQuest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select quest</option>
                  {quests?.map((quest) => (
                    <option
                      key={`quest-${quest.title}`}
                      value={`${quest.title}`}
                    >
                      {quest.title}
                    </option>
                  ))}
                </select>
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
                      setEditableElement(null);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              user?.activeQuest.length > 0 && (
                <div>
                  <ActiveQuest activeQuestTitle={user.activeQuest} />
                  <button
                    className="button sub--button"
                    onClick={(event) => {
                      event.preventDefault();
                      setEditableElement(`${user.activeQuest}`);
                      setFormData({ activeQuest: `${user.activeQuest}` });
                    }}
                  >
                    EDIT
                  </button>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Stats;
