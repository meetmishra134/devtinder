import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, About, age, gender, skills, photoUrl } =
    user;
  async function handleSendRequest(status, _id) {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      console.log(res);
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error(error.response?.data?.message || "Error sending request");
    }
  }

  return (
    <div className="card bg-base-300 w-80 shadow-sm lg:w-96">
      <figure>
        <img
          src={photoUrl || "https://image.pngaaa.com/853/3873853-middle.png"}
          alt="user"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          <span className="font-semibold">Age:</span> {age || 20}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {gender || "Male"}
        </p>
        <p>
          <span className="font-semibold">Skills:</span> {"Javascript"}
        </p>
        <p>
          <span className="font-semibold">About:</span>{" "}
          {"I am a developer lets connect"}
        </p>
        <div className="card-actions mt-3.5 justify-between">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("rejected", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
