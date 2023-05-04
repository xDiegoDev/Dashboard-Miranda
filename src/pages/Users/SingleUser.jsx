import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAsync } from "../../features/userSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "./StyledUser";
import { BookingComp } from "../Bookings/StyledSingleBook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MessageIcon from "@mui/icons-material/Message";

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
    navigate("/users");
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <BookingComp>
        <div
          className="details"
          style={{
            display: "block",
            margin: "auto",
            letterSpacing: "2px",
            position: "relative",
          }}
        >
          <button
            style={{
              position: "absolute",
              right: "30px",
              top: "30px",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "10px 20px ",
              fontSize: "15px",
              background: "#424242",
              color: "white",
            }}
            onClick={handleEditClick}
          >
            Edit User
          </button>
          <div
            className="guest"
            style={{ alignItems: "center", marginTop: "30px" }}
          >
            <img src={user.IMG} style={{ width: "400px" }} />
            <div>
              <h2>{user.Name}</h2>
              <h2 style={{ fontSize: "20px" }}>{user.Email}</h2>
              <p>{user.ID}</p>
              <p>{user.Status}</p>
              <div className="inner__div">
                <LocalPhoneIcon style={{ color: "white" }} />
                <button>
                  <MessageIcon />
                  <p>Send message</p>
                </button>
              </div>
            </div>
          </div>
          <div className="line">
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              width: "100%",
              color: "white",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <h3 className="text">{user.Description}</h3>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
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
            <button
              type="submit"
              style={{
                width: "30%",
                display: "block",
                margin: "auto",
                marginTop: "30px",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "10px 20px ",
                fontSize: "15px",
                background: "#424242",
                color: "white",
              }}
            >
              Save
            </button>
            <button
              style={{
                width: "30%",
                display: "block",
                margin: "auto",
                marginTop: "30px",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "10px 20px ",
                fontSize: "15px",
                background: "#424242",
                color: "white",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </Form>
        </Modal>
      </BookingComp>
    </>
  );
};

export default SingleUser;
