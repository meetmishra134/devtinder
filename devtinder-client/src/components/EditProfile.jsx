import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    // console.log(data);
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, data, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.log(error.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex h-[800px] items-center justify-center">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-md space-y-1 border p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-lg font-medium">Edit Profile</h2>
        <label className="label">FirstName</label>
        <input
          type="text"
          className="input w-full"
          placeholder="firstName"
          defaultValue={user.firstName}
          {...register("firstName", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">LastName</label>
        <input
          type="text"
          className="input w-full"
          placeholder="lastName"
          defaultValue={user.lastName}
          {...register("lastName", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">Age</label>
        <input
          type="number"
          min="1"
          className="input w-full"
          placeholder="age"
          defaultValue={user.age}
          {...register("age", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">Gender</label>
        <input
          type="text"
          className="input w-full"
          placeholder="gender"
          defaultValue={user.gender}
          {...register("gender", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">Skills</label>
        <input
          type="text"
          className="input w-full"
          placeholder="skills"
          defaultValue={user.skills}
          {...register("skills", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">About</label>
        <input
          type="text"
          className="input w-full"
          placeholder="about"
          defaultValue={user.About}
          {...register("About", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <label className="label">About</label>
        <input
          type="url"
          className="input w-full"
          placeholder="photoUrl"
          defaultValue={user.photoUrl}
          {...register("photoUrl", { required: true })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-soft btn-primary mt-4">
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
