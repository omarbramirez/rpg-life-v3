import { useEffect, useState } from "react";
import Avatar from "../components/statsComponents/Avatar";
import ListedSkill from "../components/statsComponents/ListedSkill";
import UserName from "../components/statsComponents/UserName";
import Countdown from "../components/statsComponents/Countdown";
import ActiveQuest from "../components/statsComponents/ActiveQuest";
import { getSkillList, getUser } from "../routes/stats";
function Stats() {
  const [listedSkills, setListedSkills] = useState(null);
  const [user, setUser] = useState(null);
  const [targetDate, setTargetDate] = useState("2025-06-01");

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching getSkillList():", error));

    getSkillList()
      .then((data) => {
        setListedSkills(data);
      })
      .catch((error) => console.error("Error fetching getSkillList():", error));
  }, []);

  return (
    <>
      <h2>STATS</h2>
      {user ? (
        <section>
          <div>
            <h3>Info</h3>
            <ul>
              <li>
                <UserName username={user.name} />
              </li>
              <li>
                <table>
                  <tbody>
                    <tr>
                      <th>LVL</th>
                      <td>{user.level}</td>
                    </tr>
                    <tr>
                      <th>NEXT LVL</th>
                      <td>{user.nextLevelPX}</td>
                    </tr>
                    <tr>
                      <th>PX</th>
                      <td>{user.totalPX}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <Avatar
            userImg={
              "https://darksouls.wdfiles.com/local--files/bosses/knight-artorias.jpg"
            }
          />
          {listedSkills ? (
            <table>
              <thead>
                <tr>
                  <th scope="col">Attribute</th>
                  <th scope="col">Lvl</th>
                </tr>
              </thead>
              <tbody>
                {listedSkills.map((skill, index) => (
                  <ListedSkill
                    key={`sistedSkill-${skill.title}-${index}`}
                    skill={skill}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
        </section>
      ) : null}
      {targetDate ? <Countdown targetDate={targetDate} /> : null}

      {user?.activeQuest ? (
        <section>
          <ActiveQuest activeQuestTitle={user.activeQuest} />
        </section>
      ) : null}
    </>
  );
}

export default Stats;
