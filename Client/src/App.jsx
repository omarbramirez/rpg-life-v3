import "./styles.css";
import Skills from "./sections/Skills";
import Quests from "./sections/Quests";
import Stats from "./sections/Stats";
import { useState, useEffect } from "react";
import { getUser } from "./routes/stats";
import { updateElement } from "./routes/stats";

function App() {
  const [user, setUser] = useState(null);
  const [editableElement, setEditableElement] = useState(null);
  const [formData, setFormData] = useState({ chapter: "" });
  const [section, setSection] = useState(
    localStorage.getItem("section") || "STATS"
  );
  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching getUser():", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("section", section);
  }, [section]);

  const handleSubmit = async () => {
    const { chapter } = formData;
    if (chapter?.length > 0) {
      await updateElement({ chapter: chapter });
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
      <div>
        {editableElement === user?.chapter ? (
          <div>
            <input
              type="chapter"
              id="chapter"
              name="chapter"
              value={formData.chapter}
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
            <div className="chapter-container">
              <h1 className="chapter">{user?.chapter}</h1>
              <button
                className="button sub--button"
                onClick={(event) => {
                  event.preventDefault();
                  setEditableElement(`${user.chapter}`);
                  setFormData({ chapter: `${user.chapter}` });
                }}
              >
                EDIT
              </button>
            </div>
          )
        )}

        <ul className="section--selector">
          <li>
            <button
              className="button"
              onClick={(event) => {
                event.preventDefault();
                setSection("STATS");
              }}
            >
              STATS
            </button>
          </li>
          <li>
            <button
              className="button"
              onClick={(event) => {
                event.preventDefault();
                setSection("QUESTS");
              }}
            >
              QUESTS
            </button>
          </li>
          <li>
            <button
              className="button"
              onClick={(event) => {
                event.preventDefault();
                setSection("SKILLS");
              }}
            >
              SKILLS
            </button>
          </li>
        </ul>
      </div>
      {section === "STATS" ? <Stats user={user} setUser={setUser} /> : null}
      {section === "QUESTS" ? <Quests /> : null}
      {section === "SKILLS" ? <Skills userName={user?.name} /> : null}
    </>
  );
}

export default App;
