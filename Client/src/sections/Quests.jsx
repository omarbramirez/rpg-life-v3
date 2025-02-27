import ActiveQuests from "../components/questsComponents/ActiveQuests";
import CompletedQuests from "../components/questsComponents/CompletedQuests";
import { useState } from "react";
function Quests() {
  const initialTotalQuests = localStorage.getItem("currentTotalQuests") || 1;
  const [totalQuests, setTotalQuests] = useState(initialTotalQuests);
  return (
    <section>
      <h2>QUESTS</h2>
      <ActiveQuests totalQuests={totalQuests} setTotalQuests={setTotalQuests} />
      <CompletedQuests totalQuests={totalQuests} />
    </section>
  );
}

export default Quests;
