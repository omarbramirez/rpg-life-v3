import { pathValidator } from "../../controllers/generalcontrollers";

function Avatar({ userImg }) {
  return (
    <>
      <img
        className="img"
        id="user_profile"
        src={`${pathValidator(userImg, "imgs")}`}
        alt={`user-profile`}
      />
    </>
  );
}

export default Avatar;
