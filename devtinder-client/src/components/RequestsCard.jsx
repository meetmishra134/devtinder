const RequestsCard = ({ requests, reviewRequest }) => {
  const { firstName, lastName, photoUrl, About, age, gender } =
    requests.fromUserId;
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <img
          src={photoUrl || "https://image.pngaaa.com/853/3873853-middle.png"}
          alt="user"
          className="w-25 rounded-full"
        />
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div className="flex items-center gap-1">
          <p>{age || 20}</p> <p>{gender || "Male"}</p>
        </div>
        <div className="card-actions mt-2 justify-end gap-20">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => reviewRequest("accepted", requests._id)}
          >
            Accept
          </button>
          <button
            className="btn btn-outline btn-error"
            onClick={() => reviewRequest("rejected", requests._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsCard;
