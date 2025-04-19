import ActiveQuests from "../components/questsComponents/ActiveQuests";
import CompletedQuests from "../components/questsComponents/CompletedQuests";
import { useState } from "react";
function Quests() {
  const initialTotalQuests = localStorage.getItem("currentTotalQuests") || 1;
  const [totalQuests, setTotalQuests] = useState(initialTotalQuests);
  return (
    <div className="section" id="quests">
      <section className="quests--lists">
        <h2 className="section--title quests--section--title">QUESTS</h2>
        <ActiveQuests
          totalQuests={totalQuests}
          setTotalQuests={setTotalQuests}
        />
        <CompletedQuests totalQuests={totalQuests} />
      </section>
    </div>
  );
}

export default Quests;
