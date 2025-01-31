import ActiveQuests from "../components/questsComponents/ActiveQuests";
import CompletedQuests from "../components/questsComponents/CompletedQuests";

function Quests() {
  return (
    <section>
      <ActiveQuests />
      <CompletedQuests />
    </section>
  );
}

export default Quests;
