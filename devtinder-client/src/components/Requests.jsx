import axios from "axios";
import RequestsCard from "./RequestsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  async function reviewRequest(status, _id) {
    try {
      const res = await axios.post(
        `http://localhost:7777/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      console.log(res);
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.response?.data?.message || "Error reviewing request");
    }
  }

  async function fetchRequests() {
    try {
      const res = await axios.get(
        "http://localhost:7777/user/requests/received",
        { withCredentials: true },
      );
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching requests");
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div className="flex items-center justify-center gap-10 p-6">
      {requests.length !== 0 ? (
        requests.map((request) => (
          <RequestsCard
            key={request._id}
            requests={request}
            reviewRequest={reviewRequest}
          />
        ))
      ) : (
        <div>
          <p className="text-xl font-bold text-gray-300">No requests found</p>
        </div>
      )}
    </div>
  );
};

export default Requests;
