import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  async function onSubmit(data) {
    try {
      const res = await axios.post("http://localhost:7777/login", data, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="flex h-[700px] items-center justify-center">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs space-y-2 border p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-lg font-medium">Login</h2>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-soft btn-primary mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
