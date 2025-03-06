import "./styles.css";
import Skills from "./sections/Skills";
import Quests from "./sections/Quests";
import Stats from "./sections/Stats";
import { useState } from "react";

function App() {
  const [section, setSection] = useState("STATS");
  return (
    <>
      <div>
        <h1>CHAPTER III: MONTAÑA SENIORITY</h1>
        <ul>
          <li>
            <button
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
      {section === "STATS" ? <Stats /> : null}
      {section === "QUESTS" ? <Quests /> : null}
      {section === "SKILLS" ? <Skills /> : null}
    </>
  );
}

export default App;
