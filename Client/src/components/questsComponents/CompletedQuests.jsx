import { useEffect, useState } from "react";
import { getCompletedQuests } from "../../routes/quests";
import QuestCard from "./QuestCard";

function CompletedQuests({ totalQuests }) {
  const [quests, setQuests] = useState(null);

  useEffect(() => {
    getCompletedQuests().then((data) => setQuests(data));
  }, []);
  useEffect(() => {
    getCompletedQuests().then((data) => setQuests(data));
  }, [totalQuests]);
  return (
    <>
      <h3>Completed Quests</h3>
      {quests
        ? quests.map((quest, index) => (
            <QuestCard
              key={`completed-quest-${index}`}
              quest={quest}
              completed={quest.completed}
            />
          ))
        : null}
    </>
  );
}

export default CompletedQuests;
