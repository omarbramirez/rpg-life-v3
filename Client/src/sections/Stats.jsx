import { useEffect, useState } from "react";
import Avatar from "../components/statsComponents/Avatar";
import ListedSkill from "../components/statsComponents/ListedSkill";
// import UserName from "../components/statsComponents/UserName";
import Countdown from "../components/statsComponents/Countdown";
import ActiveQuest from "../components/statsComponents/ActiveQuest";
import { getSkillList, getUser, levelUp, updateElement } from "../routes/stats";

function Stats() {
  const [listedSkills, setListedSkills] = useState(null);
  const [user, setUser] = useState(null);
  const [editableElement, setEditableElement] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    targetDate: "",
  });
  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching getUser():", error));

    getSkillList()
      .then((data) => {
        setListedSkills(data);
      })
      .catch((error) => console.error("Error fetching getSkillList():", error));
  }, []);

  const handleSubmit = async () => {
    const { name, img, targetDate } = formData;
    if (name?.length > 0) {
      await updateElement({ name: name });
    }
    if (targetDate?.length > 0) {
      await updateElement({ targetDate: targetDate });
    }
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching getUser():", error));
    setEditableElement(null);
    setFormData({
      name: "",
      img: "",
      targetDate: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>STATS</h2>
      {user ? (
        <section>
          <div>
            <h3>Info</h3>
            <ul>
              <li>
                {editableElement === user.name ? (
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <h4>{user.name}</h4>
                )}

                {!editableElement ? (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setEditableElement(`${user.name}`);
                      setFormData({ name: `${user.name}` });
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        handleSubmit();
                        setEditableElement(null);
                      }}
                    >
                      Send
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setEditableElement(null);
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </li>
              <li>
                <table>
                  <tbody>
                    <tr>
                      <th>LVL</th>
                      <td>{user.level}</td>
                      <td>
                        {user.totalPX > user.nextLevelPX ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              levelUp();
                            }}
                          >
                            Level Up
                          </button>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <th>NEXT LVL</th>
                      <td>{user.nextLevelPX}</td>
                    </tr>
                    <tr>
                      <th>PX</th>
                      <td>{user.totalPX}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <Avatar
            userImg={
              "https://darksouls.wdfiles.com/local--files/bosses/knight-artorias.jpg"
            }
          />
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
        </section>
      ) : null}
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
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
              setEditableElement(null);
            }}
          >
            Send
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setEditableElement(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
      {user ? <Countdown targetDate={user.targetDate} /> : null}

      {user?.activeQuest ? (
        <section>
          <ActiveQuest activeQuestTitle={user.activeQuest} />
        </section>
      ) : null}
    </>
  );
}

export default Stats;
