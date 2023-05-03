import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingAsync } from "../../features/bookingSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "../Users/StyledUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  const booking = bookings.find((booking) => String(booking.ID) === String(id));

  const [editedGuest, setEditedGuest] = useState(booking["Guest"]);
  // Add other room properties that need to be edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedBooking = {
      ...booking,
      Guest: editedGuest,
      // Update other room properties here
    };

    try {
      await dispatch(updateBookingAsync(updatedBooking));
    } catch (error) {
      console.error("Failed to update booking:", error);
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
          {booking.IMG.map((image, index) => (
            <div key={index} style={{ width: "100%", height: "100%" }}>
              <img
                src={image}
                alt={`Booking image ${index}`}
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

        <h1>{booking["Guest"]}</h1>
        <h6>{booking.ID}</h6>
        {/* Add other room properties to display */}
      </User>
      <button onClick={handleEditClick}>Edit Booking</button>
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
          {/* Add other form fields to match the room data properties */}
          <button type="submit">Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Form>
      </Modal>
    </UserComp>
  );
};

export default SingleBooking;
