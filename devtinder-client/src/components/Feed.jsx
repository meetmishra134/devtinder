import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
const Feed = () => {
  const userFeed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  async function fetchFeed() {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching feed");
    }
  }
  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex h-[700px] items-center justify-center">
      {!userFeed || userFeed.length === 0 ? (
        <p className="text-xl text-gray-300">Feed is empty</p>
      ) : (
        <UserCard user={userFeed[0]} />
      )}
    </div>
  );
};

export default Feed;
