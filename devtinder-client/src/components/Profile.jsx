import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const userInfo = useSelector((store) => store.user);
  return (
    <div className="flex items-center justify-center gap-10">
      <EditProfile />
      {userInfo && <UserCard user={userInfo} />}
    </div>
  );
};

export default Profile;
