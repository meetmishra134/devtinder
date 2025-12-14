import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  async function fetchConnections() {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(
        error.response?.data?.message || "Error fetching connections",
      );
    }
  }
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div>
      <h2 className="my-8 text-center text-2xl font-semibold">Connections</h2>
      <div className="grid grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {connections &&
          connections.map((connections) => (
            <ConnectionCard key={connections._id} connections={connections} />
          ))}
      </div>
    </div>
  );
};

export default Connections;
