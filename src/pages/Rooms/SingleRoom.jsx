import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRoomAsync } from "../../features/roomSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "../Users/StyledUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BookingComp,
  BookingSlider,
  Ribbon,
} from "../Bookings/StyledSingleBook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MessageIcon from "@mui/icons-material/Message";

const SingleRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const navigate = useNavigate();
  const room = rooms.find((room) => String(room.ID) === String(id));
  const [editedName, setEditedName] = useState(room["Room Name"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(room.Offer);
  const [editedStatus, setEditedStatus] = useState(room.Status);

  if (!room) {
    return <div>Room not found</div>;
  }

  const roomMap = {
    "Deluxe A-": { bedType: "Single", price: 100 },
    "Deluxe B-": { bedType: "Double", price: 200 },
    "Deluxe C-": { bedType: "Double Deluxe", price: 300 },
    "Deluxe D-": { bedType: "Suite", price: 400 },
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedRoom = {
      ...room,
      "Room Name": editedName,
      "Bed Type": roomMap[editedName].bedType, // Update bed type based on editedName
      Rate: `$${roomMap[editedName].price} / night`, // Update rate based on editedName
      Status: editedStatus,
      Offer: editedOffer,
    };

    try {
      await dispatch(updateRoomAsync(updatedRoom));
      navigate("/rooms");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#4CAF50"; // Green
      case "Booked":
        return "#F44336"; // Red
      default:
        return "white";
    }
  };

  return (
    <BookingComp style={{ marginTop: "13%" }}>
      <div className="details" style={{ width: "45%", position: "relative" }}>
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
          Edit Room
        </button>
        <div className="guest">
          <div>
            <h2>
              {room["Room Name"]}
              {room.Number}
            </h2>
            <p>{room.ID}</p>
            {room.Status !== "Booked" && (
              <div className="inner__div">
                <LocalPhoneIcon style={{ color: "white" }} />
                <button>
                  <MessageIcon />
                  <p>Book now!</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="line">
          <div></div>
        </div>
        <div className="room_details">
          <div className="info__price">
            <div>
              <p>Room info</p>
              <p>
                <strong>{room["Bed Type"]}</strong>
              </p>
            </div>
            <div>
              <p>Price</p>
              <p>
                <strong>{room.Rate}</strong>
              </p>
            </div>
          </div>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque tincidunt dui vitae ante facilisis, nec blandit eros
            lacinia. Sed quam lacus, auctor id sem in, molestie maximus ex.
            Etiam facilisis congue sapien, eget convallis nibh elementum at.
            Nullam vehicula placerat ipsum ut accumsan. Fusce commodo quam
            tincidunt, aliquam augue vel, fermentum ipsum. Cras semper iaculis
            risus, vel aliquam nisi tincidunt vitae. Sed elit sapien, rhoncus at
            tellus lacinia, luctus placerat nisl. Donec dapibus neque in ipsum
            porttitor, ac rutrum neque vulputate.
          </p>
          <div className="facilities__div">
            <p>Facilities</p>
            <div className="facilities">
              {room.Facilities.split(", ").map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
      <BookingSlider>
        <Slider {...settings} style={{ width: "95%", height: "850px" }}>
          {room.IMG.map((image, index) => (
            <div
              key={index}
              style={{ width: "100%", height: "850px", position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: "850px",
                }}
              >
                <Ribbon color={getStatusColor(room.Status)}>
                  {room.Status}
                </Ribbon>
                <img
                  src={image}
                  alt={`Booking image ${index}`}
                  style={{
                    width: "100%",
                    height: "850px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </BookingSlider>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleEditSubmit}>
          <label htmlFor="roomName">
            Room Name:
            <select
              id="roomName"
              name="roomName"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            >
              {Object.keys(roomMap).map((roomName, index) => (
                <option value={roomName} key={index}>
                  {roomName}
                </option>
              ))}
            </select>
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
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </label>
          <label htmlFor="offer">
            <input
              id="offer"
              name="offer"
              value={editedOffer}
              type="number"
              onChange={(e) => setEditedOffer(e.target.value)}
            />
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
  );
};

export default SingleRoom;
