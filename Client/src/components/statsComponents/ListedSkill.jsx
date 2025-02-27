function ListedSkill({ skill }) {
  return (
    <tr>
      <th>{skill.title}</th>
      <th>{skill.level}</th>
    </tr>
  );
}

export default ListedSkill;
