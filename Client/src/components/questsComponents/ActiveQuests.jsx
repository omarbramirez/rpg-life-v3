import { useEffect, useState } from "react";
import { getActiveQuests } from "../../routes/quests";
import { handlePaginationLimit } from "../../controllers/questscontrollers";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";

function ActiveQuests() {
  const initialTotalQuests = localStorage.getItem("currentTotalQuests") || 1;

  const [quests, setQuests] = useState(null);
  const [totalQuests, setTotalQuests] = useState(initialTotalQuests);
  const [crudAction, setCrudAction] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  useEffect(() => {
    handlePaginationLimit().then((data) => setTotalQuests(data));
    localStorage.setItem("currentTotalQuests", totalQuests.toString());
  }, []);
  //aqui me quedé
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
        <h2>Quests</h2>
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
              />
            ))
          : null}
      </div>
    </>
  );
}

export default ActiveQuests;
