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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortByName, setSortByName] = useState(false);

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

  const filterUsersByName = (users) => {
    if (!searchTerm) return users;
    return users.filter((user) =>
      user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const sortUsers = (users) => {
    let sortedUsers = [...users];

    switch (sortOrder) {
      case "newest":
        sortedUsers.sort(
          (a, b) => new Date(b["Start Date"]) - new Date(a["Start Date"])
        );
        break;
      case "oldest":
        sortedUsers.sort(
          (a, b) => new Date(a["Start Date"]) - new Date(b["Start Date"])
        );
        break;
      case "name":
        sortedUsers.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      default:
        break;
    }

    return sortedUsers;
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
          <div
            style={{
              width: "72%",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "13%",
              marginBottom: "-100px",
              color: "white",
              marginTop: "150px",
            }}
          >
            <input
              type="text"
              id="search-user"
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 20px",
                color: "white",
                border: "1px solid white",
                borderRadius: "10px",
                background: "#212121",
                marginLeft: "10px",
              }}
            />
            <button
              data-cy="addUser"
              style={{
                display: "block",
                color: "white",
                fontSize: "15px",
                backgroundColor: "#222",
                border: "2px solid white",
                borderRadius: "10px",
                width: "130px",
                marginLeft: "380px",
              }}
              onClick={handleAddUser}
            >
              Add User
            </button>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                padding: "10px 30px",
                color: "white",
                border: "1px solid white",
                borderRadius: "10px",
                background: "#212121",
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">By Name</option>
            </select>
          </div>
          <Table
            initialData={sortUsers(filterUsersByName(usersData))}
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
                <input data-cy="img" type="text" id="img" name="img" />
              </label>
              <label htmlFor="name">
                Name:
                <input
                  data-cy="name"
                  required
                  type="text"
                  id="name"
                  name="name"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  data-cy="email"
                  required
                  type="email"
                  id="email"
                  name="email"
                />
              </label>
              <label htmlFor="startDate">
                Start Date:
                <input
                  data-cy="startDate"
                  required
                  type="date"
                  id="startDate"
                  name="startDate"
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  data-cy="job"
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
                <select data-cy="status" required id="status" name="status">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <label htmlFor="password">
                Password:
                <input
                  data-cy="password"
                  required
                  type="password"
                  id="password"
                  name="password"
                />
              </label>{" "}
              <button
                type="submit"
                data-cy="submit"
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
        </>
      )}
    </div>
  );
};

export default Users;
