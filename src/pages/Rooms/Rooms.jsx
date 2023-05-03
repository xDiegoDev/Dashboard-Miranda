import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import {
  fetchRoomsAsync,
  addRoomAsync,
  deleteRoomAsync,
} from "../../features/roomSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";

const Rooms = () => {
  const dispatch = useDispatch();
  const roomsData = useSelector((state) => state.rooms.rooms);
  const loading = useSelector((state) => state.rooms.status === "loading");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRoomsAsync());
  }, [dispatch]);

  const handleDelete = (room) => {
    dispatch(deleteRoomAsync(room.ID));
  };

  const handleAddRoom = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoom = {
      IMG: e.target.elements.img.value,
      "Room Name": e.target.elements.name.value,
      ID: nanoid(),
      "Bed Type": e.target.elements.bedType.value,
      Facilities: e.target.elements.facilities.value,
      Rate: e.target.elements.price.value,
      Offer: e.target.elements.offer.value,
      Status: e.target.elements.status.value,
      Cancellation: e.target.elements.cancellation.value,
    };

    dispatch(addRoomAsync(newRoom));
    setIsModalOpen(false);
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
            initialData={roomsData}
            onDelete={handleDelete}
            route="rooms"
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
                Room Name:
                <input type="text" id="name" name="name" />
              </label>
              <label htmlFor="bedType">
                Bed Type:
                <select required id="bedType" name="bedType">
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Double Superior">Double Superior</option>
                  <option value="Suite">Suite</option>
                </select>
              </label>
              <label htmlFor="facilities">
                Facilities:
                <input required type="text" id="facilities" name="facilities" />
              </label>
              <label htmlFor="price">
                Price/Night:
                <input required type="text" id="price" name="price" />
              </label>
              <label htmlFor="offer">
                Offer Price:
                <input required type="number" id="offer" name="offer" />
              </label>
              <label htmlFor="status">
                Status:
                <select required id="status" name="status">
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                </select>
              </label>
              <label htmlFor="cancellation">
                Cancellation:
                <input
                  required
                  type="text"
                  id="cancellation"
                  name="cancellation"
                />
              </label>
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
            onClick={handleAddRoom}
          >
            Add User
          </button>
        </>
      )}
    </div>
  );
};

export default Rooms;
