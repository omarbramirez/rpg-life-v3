import { useEffect, useState } from "react";
import { getActiveQuest } from "../../routes/stats";

function ActiveQuest({ activeQuestTitle }) {
  const [activeQuest, setActiveQuest] = useState(null);

  // useEffect(() => {
  //   getActiveQuest(activeQuestTitle)
  //     .then((data) => setActiveQuest(data))
  //     .catch((error) =>
  //       console.error("Error fetching getActiveQuest():", error)
  //     );
  // }, []);

  return (
    <>
      <h3>Active Quest</h3>
      {activeQuest ? (
        <ul>
          <li>
            <h4>{activeQuest.title}</h4>
          </li>
          <li>{activeQuest.description}</li>
        </ul>
      ) : null}
    </>
  );
}

export default ActiveQuest;
