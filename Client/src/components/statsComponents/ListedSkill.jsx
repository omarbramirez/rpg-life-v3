function ListedSkill({ skill }) {
  return (
    <tr>
      <th>{skill.title}</th>
      <th className="stats--number">{skill.level}</th>
    </tr>
  );
}

export default ListedSkill;
