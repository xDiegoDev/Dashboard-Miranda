import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAsync } from "../../features/userSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "./StyledUser";

const SingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const user = users.find((user) => String(user.ID) === String(id));

  const [editedName, setEditedName] = useState(user.Name);
  const [editedEmail, setEditedEmail] = useState(user.Email);
  const [editedDescription, setEditedDescription] = useState(user.Description);
  const [editedStatus, setEditedStatus] = useState(user.Status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      Name: editedName,
      Email: editedEmail,
      Description: editedDescription,
      Status: editedStatus,
    };

    try {
      await dispatch(updateUserAsync(updatedUser));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <UserComp>
      <User>
        <img
          src={user.IMG}
          style={{
            width: "300px",
            borderRadius: "30px",
          }}
        />
        <h1>{user.Name}</h1>
        <h6>{user.ID}</h6>
        <h5>{user.Email}</h5>
        <p>{user.Description}</p>
        <p>{user.Status}</p>
      </User>
      <button onClick={handleEditClick}>Edit User</button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleEditSubmit}>
          <label htmlFor="name">
            Name:
            <input
              required
              type="text"
              id="name"
              name="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              required
              type="email"
              id="email"
              name="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              required
              type="text"
              id="description"
              name="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </label>
          <label htmlFor="status">
            Status:
            <select
              required
              id="status"
              name="status"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <button type="submit">Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Form>
      </Modal>
    </UserComp>
  );
};

export default SingleUser;
