import { useEffect, useState } from "react";
import { getCompletedQuests } from "../../routes/quests";
import QuestCard from "./QuestCard";

function CompletedQuests() {
  const [quests, setQuests] = useState(null);

  useEffect(() => {
    getCompletedQuests().then((data) => setQuests(data));
  }, []);
  return (
    <>
      <h2>Completed</h2>
      {quests
        ? quests.map((quest, index) => (
            <QuestCard key={`completed-quest-${index}`} quest={quest} />
          ))
        : null}
    </>
  );
}

export default CompletedQuests;
