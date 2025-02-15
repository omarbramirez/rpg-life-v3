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

  useEffect(() => {
    handlePaginationLimit().then((data) => setTotalQuests(data));
    localStorage.setItem("currentTotalQuests", totalQuests.toString());
  }, []);
  //aqui me quedé
  useEffect(() => {
    getActiveQuests().then((data) => setQuests(data));
    console.log(totalQuests);
    localStorage.setItem("currentTotalQuests", totalQuests.toString());
  }, [totalQuests]);

  useEffect(() => {
    if (dataUpdated === true) {
      getActiveQuests().then((data) => setQuests(data));
      console.log(totalQuests);
      setDataUpdated(false);
    }
  }, [dataUpdated]);

  return (
    <>
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
      <div>
        <h2>Quests</h2>
        {quests
          ? quests.map((quest, index) => (
              <QuestCard
                key={`active-quest-${index}`}
                quest={quest}
                crudAction={crudAction}
                setCrudAction={setCrudAction}
                setTotalQuests={setTotalQuests}
                setDataUpdated={setDataUpdated}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default ActiveQuests;
