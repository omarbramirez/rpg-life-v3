import { useEffect, useState } from "react";
import { getActiveQuests } from "../../routes/quests";
import QuestCard from "./QuestCard";

function ActiveQuests() {
  const [quests, setQuests] = useState(null);

  useEffect(() => {
    getActiveQuests().then((data) => setQuests(data));
  }, []);

  return (
    <>
      <h2>Quests</h2>
      {quests
        ? quests.map((quest, index) => (
            <QuestCard key={`active-quest-${index}`} quest={quest} />
          ))
        : null}
    </>
  );
}

export default ActiveQuests;
