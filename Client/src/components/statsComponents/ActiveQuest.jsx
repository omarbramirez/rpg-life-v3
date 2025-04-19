import { useEffect, useState } from "react";
import { getActiveQuest } from "../../routes/stats";

function ActiveQuest({ activeQuestTitle }) {
  const [activeQuest, setActiveQuest] = useState(null);

  useEffect(() => {
    getActiveQuest(activeQuestTitle)
      .then((data) => setActiveQuest(data))
      .catch((error) =>
        console.error("Error fetching getActiveQuest():", error)
      );
  }, [activeQuestTitle]);

  return (
    <div>
      <h3 id="activeQuest--title">Active Quest</h3>
      {activeQuest ? (
        <ul>
          <li>
            <h3 className="activeQuest--subtitle">{activeQuest.title}</h3>
          </li>
          <li>
            <p>{activeQuest.description}</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default ActiveQuest;
