import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-300 sticky top-0 z-10 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="mx-4 flex items-center gap-3">
        <div>{user && <p>Welcome {user.firstName}</p>}</div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl} />
              </div>
            )}
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>

            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
