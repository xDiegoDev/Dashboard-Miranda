import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingAsync } from "../../features/bookingSlice";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MessageIcon from "@mui/icons-material/Message";
import { BookingComp, BookingSlider, Ribbon } from "./StyledSingleBook";
import { useNavigate } from "react-router-dom";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const navigate = useNavigate();
  const booking = bookings.find((booking) => String(booking.ID) === String(id));

  const [editedGuest, setEditedGuest] = useState(booking["Guest"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCheckIn, setEditedCheckIn] = useState(booking["Check In"]);
  const [editedCheckOut, setEditedCheckOut] = useState(booking["Check Out"]);
  const [editedRoomType, setEditedRoomType] = useState(booking["Room Type"]);
  const [editedPrice, setEditedPrice] = useState(booking.price);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedBooking = {
      ...booking,
      Guest: editedGuest,
      "Check In": editedCheckIn,
      "Check Out": editedCheckOut,
      "Room Type": editedRoomType,
      price: editedPrice,
    };

    try {
      await dispatch(updateBookingAsync(updatedBooking));
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
    setIsModalOpen(false);
    navigate("/bookings");
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
      case "Check In":
        return "#4CAF50"; // Green
      case "Progress":
        return "#FFC107"; // Yellow
      case "Check Out":
        return "#F44336"; // Red
      case "default":
        return "white";
    }
  };

  return (
    <BookingComp>
      <div className="details" style={{ width: "45%", position: "relative" }}>
        <div className="guest">
          <button
            style={{
              position: "absolute",
              right: "30px",
              bottom: "25px",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "10px 20px ",
              fontSize: "15px",
              background: "#424242",
              color: "white",
              zIndex: "10000",
            }}
            onClick={handleEditClick}
          >
            Edit Booking
          </button>
          <img src={booking.UserIMG} alt="UserIMG" />
          <div>
            <h2>{booking.Guest}</h2>
            <p>ID: {booking.ID}</p>
            <div className="inner__div">
              <LocalPhoneIcon style={{ color: "white" }} />
              <button>
                <MessageIcon />
                <p>Send message</p>
              </button>
            </div>
          </div>
        </div>
        <div className="checks">
          <div>
            <p>Check in</p>
            <p>
              <strong>{booking["Check In"]}</strong>
            </p>
          </div>
          <div>
            <p>Check out</p>
            <p>
              <strong>{booking["Check Out"]}</strong>
            </p>
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
                <strong>{booking["Room Type"]}</strong>
              </p>
            </div>
            <div>
              <p>Price</p>
              <p>
                <strong>{booking.price}</strong>
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
              {booking.facilities?.map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
      <BookingSlider>
        <Slider {...settings} style={{ width: "95%", height: "970px" }}>
          {booking.IMG.map((image, index) => (
            <div
              key={index}
              style={{ width: "100%", height: "1000px", position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: "970px",
                }}
              >
                <Ribbon color={getStatusColor(booking.Status)}>
                  {booking.Status}
                </Ribbon>
                <img
                  src={image}
                  alt={`Booking image ${index}`}
                  style={{
                    width: "100%",
                    height: "970px",
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
          <label htmlFor="guest">
            Guest:
            <input
              required
              type="text"
              id="guest"
              name="guest"
              value={editedGuest}
              onChange={(e) => setEditedGuest(e.target.value)}
            />
          </label>

          <label htmlFor="checkin">
            Check In:
            <input
              required
              type="date"
              id="checkin"
              name="checkin"
              value={editedCheckIn}
              onChange={(e) => setEditedCheckIn(e.target.value)}
            />
          </label>

          <label htmlFor="checkout">
            Check Out:
            <input
              required
              type="date"
              id="checkout"
              name="checkout"
              value={editedCheckOut}
              onChange={(e) => setEditedCheckOut(e.target.value)}
            />
          </label>

          <label htmlFor="roomtype">
            Room Type:
            <input
              required
              type="text"
              id="roomtype"
              name="roomtype"
              value={editedRoomType}
              onChange={(e) => setEditedRoomType(e.target.value)}
            />
          </label>

          <label htmlFor="price">
            Price:
            <input
              required
              type="text"
              id="price"
              name="price"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Form>
      </Modal>
    </BookingComp>
  );
};

export default SingleBooking;
