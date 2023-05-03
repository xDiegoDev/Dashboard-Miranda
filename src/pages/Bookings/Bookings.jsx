import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import {
  fetchBookingsAsync,
  addBookingAsync,
  deleteBookingAsync,
} from "../../features/bookingSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookingsData = useSelector((state) => state.bookings.bookings);
  const loading = useSelector((state) => state.rooms.status === "loading");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBookingsAsync());
  }, [dispatch]);

  const handleDelete = (booking) => {
    dispatch(deleteBookingAsync(booking.ID));
  };

  const handleAddRoom = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      IMG: e.target.elements.img.value,
      Guest: e.target.elements.guest.value,
      ID: nanoid(),
      "Order Date": e.target.elements.orderDate.value,
      "Check In": e.target.elements.checkIn.value,
      "Check Out": e.target.elements.checkOut.value,
      "Special Request": "View Notes",
      "Room Type": e.target.elements.roomType.value,
      Status: e.target.elements.status.value,
    };

    dispatch(addBookingAsync(newBooking));
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
            initialData={bookingsData}
            onDelete={handleDelete}
            route="bookings"
          />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <h2 style={{ color: "white" }}>Create New Booking</h2>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="img">
                Image URL:
                <input type="text" id="img" name="img" />
              </label>
              <label htmlFor="guest">
                Guest:
                <input type="text" id="guest" name="guest" />
              </label>
              <label htmlFor="orderDate">
                Order Date:
                <input type="date" id="orderDate" name="orderDate" />
              </label>
              <label htmlFor="checkIn">
                Check In:
                <input type="date" id="checkIn" name="checkIn" />
              </label>
              <label htmlFor="checkOut">
                Check Out:
                <input type="date" id="checkOut" name="checkOut" />
              </label>
              <label htmlFor="roomType">
                Room Type:
                <select required id="roomType" name="roomType">
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Double Deluxe">Double Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </label>
              <label htmlFor="status">
                Status:
                <select required id="status" name="status">
                  <option value="Check In">Check In</option>
                  <option value="Check Out">Check Out</option>
                  <option value="Progress">Progress</option>
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
            Add Booking
          </button>
        </>
      )}
    </div>
  );
};

export default Bookings;
