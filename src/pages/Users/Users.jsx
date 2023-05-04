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
import Modal from "../../components/Modal";
import { Form } from "./StyledUser";
import { useAuth } from "../../contexts/useAuth";
import { BookingComp } from "../Bookings/StyledSingleBook";

const Users = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const usersStatus = useSelector((state) => state.users.status);
  const loading = useSelector((state) => state.users.status === "loading");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, userEmail } = useAuth();

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsersAsync());
    }
  }, [dispatch]);

  const handleDelete = (user) => {
    dispatch(deleteUserAsync(user.ID));
    if (isLoggedIn && user.Email === userEmail) {
      handleLogout();
    }
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCreateUser = (newUser) => {
    dispatch(addUserAsync(newUser));
    setIsModalOpen(false);
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
            colors={["white", "black", "#8f8f8f", "#212121", "#414141"]}
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
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <h2 style={{ color: "white" }}>Create New User</h2>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="img">
                Image URL:
                <input type="text" id="img" name="img" />
              </label>
              <label htmlFor="name">
                Name:
                <input required type="text" id="name" name="name" />
              </label>
              <label htmlFor="email">
                Email:
                <input required type="email" id="email" name="email" />
              </label>
              <label htmlFor="startDate">
                Start Date:
                <input required type="date" id="startDate" name="startDate" />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  required
                  type="text"
                  id="description"
                  name="description"
                />
              </label>
              <label htmlFor="contact">
                Contact:
                <input required type="text" id="contact" name="contact" />
              </label>
              <label htmlFor="status">
                Status:
                <select required id="status" name="status">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <label htmlFor="password">
                Password:
                <input required type="password" id="password" name="password" />
              </label>{" "}
              <button
                type="submit"
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: "50px",
                  padding: "10px 20px",
                  color: "white",
                  fontSize: "15px",
                  backgroundColor: "#222",
                  border: "3px solid #414141",
                  borderRadius: "20px",
                }}
              >
                Save
              </button>
            </Form>
          </Modal>
          <button
            style={{
              display: "block",
              padding: "10px 20px",
              color: "white",
              fontSize: "15px",
              backgroundColor: "#222",
              border: "3px solid #414141",
              borderRadius: "20px",
              margin: "auto",
              marginTop: "50px",
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
