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
import Select from "react-select";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookingsData = useSelector((state) => state.bookings.bookings);
  const bookingsStatus = useSelector((state) => state.bookings.status);
  const loading = useSelector((state) => state.rooms.status === "loading");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [facilities, setFacilities] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookingsAsync());
    }
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setActive(status);
  };

  const handleDelete = (booking) => {
    dispatch(deleteBookingAsync(booking.ID));
  };

  const handleAddRoom = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imgUrls = e.target.elements.img.value
      .split(",")
      .map((url) => url.trim());

    if (imgUrls.length < 3 || imgUrls.length > 5) {
      alert("Please provide between 3 and 5 image URLs");
      return;
    }

    const newBooking = {
      IMG: imgUrls,
      Guest: e.target.elements.guest.value,
      ID: nanoid(),
      "Order Date": e.target.elements.orderDate.value,
      "Check In": e.target.elements.checkIn.value,
      "Check Out": e.target.elements.checkOut.value,
      "Special Request": "View Notes",
      "Room Type": e.target.elements.roomType.value,
      Status: e.target.elements.status.value,
      facilities: facilities.map((facility) => facility.value),
    };

    dispatch(addBookingAsync(newBooking));
    setIsModalOpen(false);
  };

  let filteredBookings = [];

  if (bookingsData) {
    filteredBookings = bookingsData
      .filter((booking) => {
        if (searchTerm === "") {
          return true;
        }
        return booking.Guest.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((booking) => {
        if (statusFilter === "all") {
          return true;
        }
        return booking.Status === statusFilter;
      });
  }

  const facilityOptions = [
    { value: "TV", label: "TV" },
    { value: "AC", label: "AC" },
    { value: "Double Bed", label: "Double Bed" },
    { value: "Parking Spot", label: "Parking Spot" },
    { value: "WiFi", label: "WiFi" },
    { value: "Fridge", label: "Fridge" },
  ];

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
              display: "flex",
              alignItems: "center",
              marginTop: "150px",
              marginLeft: "-20%",
              marginBottom: "-130px",
              color: "white",
            }}
          >
            <div></div>
            <div
              style={{
                marginLeft: "23%",
                fontSize: "18px",
                letterSpacing: "1.5px",
              }}
            >
              <button
                onClick={() => handleStatusFilterChange("Check In")}
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "0 30px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom:
                    active === "Check In"
                      ? "2px solid white"
                      : "1px solid gray",
                }}
              >
                <p>Check In</p>
              </button>
              <button
                onClick={() => handleStatusFilterChange("Check Out")}
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "0 30px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom:
                    active === "Check Out"
                      ? "2px solid white"
                      : "1px solid gray",
                }}
              >
                <p>Check Out</p>
              </button>
              <button
                onClick={() => handleStatusFilterChange("Progress")}
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "0 30px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom:
                    active === "Progress"
                      ? "2px solid white"
                      : "1px solid gray",
                }}
              >
                <p>In Progress</p>
              </button>
              <button
                onClick={() => handleStatusFilterChange("all")}
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "0 30px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom:
                    active === "all" ? "2px solid white" : "1px solid gray",
                }}
              >
                <p>All Guest</p>
              </button>
            </div>
            <button
              style={{
                padding: "10px 30px",
                color: "white",
                fontSize: "15px",
                backgroundColor: "#222",
                border: "2px solid white",
                borderRadius: "10px",
                marginLeft: "7%",
              }}
              onClick={handleAddRoom}
            >
              Add Booking
            </button>
            <input
              type="text"
              placeholder="Search Guest"
              onChange={handleSearchChange}
              style={{
                marginLeft: "10%",
                padding: "10px 20px",
                color: "white",
                border: "1px solid white",
                borderRadius: "10px",
                background: "#212121",
              }}
            />
          </div>
          <Table
            initialData={filteredBookings}
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
                Image URLs (comma separated)
                <input type="text" id="img" name="img" />
              </label>
              <label htmlFor="guest">
                Guest:
                <input type="text" id="guest" name="guest" required />
              </label>
              <label htmlFor="orderDate">
                Order Date:
                <input type="date" id="orderDate" name="orderDate" required />
              </label>
              <label htmlFor="checkIn">
                Check In:
                <input type="date" id="checkIn" name="checkIn" required />
              </label>
              <label htmlFor="checkOut">
                Check Out:
                <input type="date" id="checkOut" name="checkOut" required />
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
              <label htmlFor="facilities">
                Facilities:
                <Select
                  isMulti
                  id="facilities"
                  name="facilities"
                  options={facilityOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={setFacilities}
                />
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
        </>
      )}
    </div>
  );
};

export default Bookings;
