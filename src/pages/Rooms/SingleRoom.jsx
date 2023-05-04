import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRoomAsync } from "../../features/roomSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "../Users/StyledUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);

  const room = rooms.find((room) => String(room.ID) === String(id));

  const [editedName, setEditedName] = useState(room["Room Name"]);
  // Add other room properties that need to be edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!room) {
    return <div>Room not found</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedRoom = {
      ...room,
      "Room Name": editedName,
      // Update other room properties here
    };

    try {
      await dispatch(updateRoomAsync(updatedRoom));
    } catch (error) {
      console.error("Failed to update room:", error);
    }
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <UserComp>
      <User>
        <Slider {...settings} style={{ width: "300px", height: "300px" }}>
          {room.IMG.map((image, index) => (
            <div key={index} style={{ width: "100%", height: "100%" }}>
              <img
                src={image}
                alt={`Room image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
              />
            </div>
          ))}
        </Slider>

        <h1>{room["Room Name"]}</h1>
        <h6>{room.ID}</h6>
        {/* Add other room properties to display */}
      </User>
      <button onClick={handleEditClick}>Edit Room</button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleEditSubmit}>
          <label htmlFor="name">
            Room Name:
            <input
              required
              type="text"
              id="name"
              name="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </label>
          {/* Add other form fields to match the room data properties */}
          <button type="submit">Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Form>
      </Modal>
    </UserComp>
  );
};

export default SingleRoom;
