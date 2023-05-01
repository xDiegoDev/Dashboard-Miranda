import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import {
  fetchUsersAsync,
  deleteUserAsync,
  addUserAsync,
} from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";

const Users = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.status === "loading");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleDelete = (user) => {
    dispatch(deleteUserAsync(user.ID));
  };

  const handleAddUser = () => {
    setCreateModalOpen(true);
  };

  const handleCreateUser = (newUser) => {
    dispatch(addUserAsync(newUser));
    setCreateModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      IMG: e.target.img.value,
      Name: e.target.name.value,
      ID: nanoid(),
      Email: e.target.email.value,
      "Start Date": e.target.startDate.value,
      Description: e.target.description.value,
      Contact: e.target.contact.value,
      Status: e.target.status.value,
      Password: e.target.password.value,
    };

    handleCreateUser(newUser);
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader
            type="ThreeDots"
            colors={["white", "black", "#5a14a1", "#9966cc", "#734c99"]}
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          <Table
            initialData={usersData}
            onDelete={handleDelete}
            route="users"
          />
          {createModalOpen && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                background: "white",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <h2>Create New User</h2>
              <form onSubmit={handleSubmit}>{/* ... */}</form>
              <button onClick={() => setCreateModalOpen(false)}>Cancel</button>
            </div>
          )}
          <button
            style={{
              display: "block",
              margin: "auto",
              marginTop: "50px",
              padding: "10px 20px",
              color: "white",
              fontSize: "15px",
              backgroundColor: "#222",
              border: "3px solid #9966cc",
              borderRadius: "20px",
            }}
            onClick={handleAddUser}
          >
            Add User
          </button>
        </>
      )}
    </div>
  );
};

export default Users;
