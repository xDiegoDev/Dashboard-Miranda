import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import {
  fetchUsersAsync,
  deleteUserAsync,
  addUserAsync,
} from "../../features/userSlice.tsx";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import Modal from "../../components/Modal.jsx";
import { Form } from "./StyledUser.jsx";
import { useAuth } from "../../contexts/useAuth.ts";
import { RootState } from "../../store/store.tsx";
import { AppDispatch } from "../../store/store.tsx";
import { User } from "../../features/userSlice.tsx";

interface UserProps {
  handleLogout: () => void;
}
const Users: React.FC<UserProps> = ({ handleLogout }) => {
  const dispatch: AppDispatch = useDispatch();
  const usersData = useSelector((state: RootState) => state.users.users);
  const usersStatus = useSelector((state: RootState) => state.users.status);
  const loading = useSelector(
    (state: RootState) => state.users.status === "loading"
  );
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

  const handleDelete = (user: { ID: string; Email?: string }) => {
    dispatch(deleteUserAsync(user.ID));
    if (isLoggedIn && user.Email === userEmail) {
      handleLogout();
    }
  };

  const filterUsersByName = (users: User[]) => {
    if (!searchTerm) return users;
    return users.filter((user: User) =>
      user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCreateUser = (newUser: User) => {
    dispatch(addUserAsync(newUser));
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      img: { value: string };
      name: { value: string };
      email: { value: string };
      startDate: { value: Date };
      description: { value: string };
      contact: { value: string };
      status: { value: string };
      password: { value: string };
    };

    const newUser: User = {
      IMG: target.img.value,
      Name: target.name.value,
      ID: nanoid(),
      Email: target.email.value,
      "Start Date": target.startDate.value,
      Description: target.description.value,
      Contact: target.contact.value,
      Status: target.status.value,
      Password: target.password.value,
    };

    handleCreateUser(newUser);
  };

  const sortUsers = (users: User[]) => {
    let sortedUsers = [...users];

    switch (sortOrder) {
      case "newest":
        sortedUsers.sort(
          (a, b) =>
            new Date(b["Start Date"]).getTime() -
            new Date(a["Start Date"]).getTime()
        );
        break;
      case "oldest":
        sortedUsers.sort(
          (a, b) =>
            new Date(a["Start Date"]).getTime() -
            new Date(b["Start Date"]).getTime()
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
            colors={["white", "black", "#8f8f8f", "#212121", "#414141"]}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "3%",
              marginRight: "3%",
              marginBottom: "-100px",
              color: "white",
              marginTop: "150px",
            }}
          >
            <div
              style={{
                marginLeft: "12%",
                marginBottom: "-150px",
                color: "white",
              }}
            >
              <label
                htmlFor="search-user"
                style={{ fontSize: "20px", letterSpacing: "1.5px" }}
              >
                Search User:
              </label>
              <input
                type="text"
                id="search-user"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  marginLeft: "18px",
                  padding: "10px 20px",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "10px",
                  background: "#212121",
                }}
              />
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "15%",
                marginRight: "15%",
                marginBottom: "-100px",
                color: "white",
              }}
            >
              <div>
                <label
                  htmlFor="sort-order"
                  style={{ fontSize: "20px", letterSpacing: "1.5px" }}
                >
                  Sort by:
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    marginLeft: "18px",
                    padding: "10px 20px",
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
            </div>
          </div>
          <Table
            initialData={sortUsers(filterUsersByName(usersData))}
            onRowClick={() => {}}
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
          <button
            data-cy="addUser"
            style={{
              display: "block",
              padding: "10px 20px",
              color: "white",
              fontSize: "15px",
              backgroundColor: "#222",
              border: "3px solid #424242",
              borderRadius: "20px",
              margin: "auto",
              marginTop: "50px",
              marginBottom: "50px",
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
