const ConnectionCard = ({ connections }) => {
  const { firstName, lastName, age, gender, About } = connections;
  return (
    <div className="card card-side bg-base-100 border-2 border-white shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{firstName + " " + lastName}</h2>
        <div className="flex flex-col gap-2">
          <p>About: {About || "A frontend developer "}</p>
          <p> Age: {age || 21}</p>
          <p>Gender: {gender || "Male"}</p>
        </div>

        {/* <div className="card-actions justify-end">
            <button className="btn btn-soft btn-secondary">Accept</button>
          </div> */}
      </div>
    </div>
  );
};

export default ConnectionCard;
