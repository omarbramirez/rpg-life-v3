function QuestCard({ quest }) {
  return (
    <div>
      {quest ? (
        <ul>
          <li>
            <h3>{quest.title}</h3>
            <h4>{quest.category}</h4>
          </li>
          <li>
            <h4>{quest.status}</h4>
          </li>
          <li>
            <h4>{quest.status}</h4>
          </li>
          <li>
            <h4>{quest.CXP}</h4>
          </li>
          <li>
            <h4>{quest.skill}</h4>
            <h4>{quest.SXP}</h4>
          </li>
          <li>{quest.description}</li>
        </ul>
      ) : null}
    </div>
  );
}

export default QuestCard;
