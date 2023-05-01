import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsersAsync } from "../../features/userSlice";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const user = users.find((user) => String(user.ID) === String(id));

  if (!user) {
    return <div>User not found</div>;
  }

  // Render the user data or any other components as needed.
  return (
    <div>
      <h1>{user.Name}</h1>
      <img
        src={user.IMG}
        style={{
          width: "300px",
          borderRadius: "30px",
          border: "2px solid white",
        }}
      />
    </div>
  );
};

export default SingleUser;
