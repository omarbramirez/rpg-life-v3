import { useEffect, useState } from "react";
import { getActiveQuests } from "../../routes/quests";
import { handlePaginationLimit } from "../../controllers/questscontrollers";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";

function ActiveQuests({ totalQuests, setTotalQuests }) {
  const [quests, setQuests] = useState(null);

  const [crudAction, setCrudAction] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  useEffect(() => {
    handlePaginationLimit().then((data) => setTotalQuests(data));
    localStorage.setItem("currentTotalQuests", totalQuests.toString());
  }, []);
  useEffect(() => {
    getActiveQuests().then((data) => setQuests(data));
    localStorage.setItem("currentTotalQuests", totalQuests.toString());
  }, [totalQuests]);

  useEffect(() => {
    if (dataUpdated === true) {
      getActiveQuests().then((data) => setQuests(data));
      setDataUpdated(false);
    }
  }, [dataUpdated]);

  useEffect(() => {
    console.log(selectedQuest);
  }, [selectedQuest]);
  return (
    <>
      <div>
        <h3>Active Quests</h3>
        {crudAction === "ADD" ? (
          <QuestForm
            setTotalQuests={setTotalQuests}
            setCrudAction={setCrudAction}
          />
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              setCrudAction("ADD");
            }}
          >
            Add
          </button>
        )}
        {quests
          ? quests.map((quest, index) => (
              <QuestCard
                key={`active-quest-${index}`}
                quest={quest}
                setTotalQuests={setTotalQuests}
                setDataUpdated={setDataUpdated}
                setCrudAction={setCrudAction}
                action={selectedQuest === quest.title ? crudAction : null}
                setSelectedQuest={setSelectedQuest}
                selectedQuest={selectedQuest}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default ActiveQuests;
