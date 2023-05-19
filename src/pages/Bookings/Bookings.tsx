import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { Booking, BookingState } from "../../features/bookingSlice";
import { TableRow } from "../../components/Table/Table";

type StatusFilter = Booking["Status"] | "all";

const Bookings = () => {
  const dispatch: AppDispatch = useDispatch();
  const bookingsData = useSelector(
    (state: RootState) => state.bookings.bookings
  );
  const bookingsStatus = useSelector(
    (state: RootState) => state.bookings.status
  );
  const loading = useSelector(
    (state: RootState) => state.rooms.status === "loading"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [facilities, setFacilities] = useState<string[]>([]);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookingsAsync());
    }
  }, [dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setStatusFilter(status);
  };

  const handleDelete = (booking: TableRow) => {
    dispatch(deleteBookingAsync(booking.ID));
  };

  const handleAddRoom = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      img: { value: string };
      guest: { value: string };
      orderDate: { value: string };
      checkIn: { value: string };
      checkOut: { value: string };
      roomType: { value: string };
      status: { value: string };
      price: { value: string };
      userImg: { value: string }; // Added userImg field
    };

    const imgElement = e.currentTarget.elements.namedItem(
      "img"
    ) as HTMLInputElement | null;

    if (imgElement) {
      const imgUrls = imgElement.value
        .split(",")
        .map((url: string) => url.trim());

      if (imgUrls.length < 3 || imgUrls.length > 5) {
        alert("Please provide between 3 and 5 image URLs");
        return;
      }

      const newBooking: Booking = {
        IMG: imgUrls as string[],
        UserIMG: target.userImg.value,
        Guest: target.guest.value,
        ID: nanoid(),
        "Order Data": target.orderDate.value,
        "Check In": target.checkIn.value,
        "Check Out": target.checkOut.value,
        "Special Request": "View Notes",
        "Room Type": target.roomType.value,
        Status: target.status.value,
        facilities: facilities,
        price: target.price.value,
      };

      dispatch(addBookingAsync(newBooking));
      setIsModalOpen(false);
    }

    let filteredBookings: Booking[] = [];

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

    const bookingToTableRow = (booking: Booking): TableRow => ({
      UserIMG: booking.UserIMG,
      Guest: booking.Guest,
      ID: booking.ID,
      "Order Data": booking["Order Data"],
      "Check In": booking["Check In"],
      "Check Out": booking["Check Out"],
      "Special Request": booking["Special Request"],
      "Room Type": booking["Room Type"],
      Status: booking.Status,
      facilities: booking.facilities,
      price: booking.price,
      IMG: booking.IMG,
    });

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
                alignItems: "center",
                marginTop: "150px",
                marginLeft: "12%",
                marginBottom: "-130px",
                color: "white",
                width: "85%",
              }}
            >
              <div>
                <label
                  htmlFor="search-user"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1.5px",
                    marginTop: "5px",
                  }}
                >
                  Search Guest
                </label>
                <input
                  type="text"
                  placeholder="Search Guest"
                  onChange={handleSearchChange}
                  style={{
                    marginLeft: "18px",
                    padding: "10px 20px",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    background: "#212121",
                  }}
                />
              </div>
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
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                    background: "#282828",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    padding: "0 10px",
                    marginRight: "20px",
                  }}
                >
                  <p>Check In</p>
                </button>
                <button
                  onClick={() => handleStatusFilterChange("Check Out")}
                  style={{
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                    background: "#282828",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    padding: "0 10px",
                    marginRight: "20px",
                  }}
                >
                  <p>Check Out</p>
                </button>
                <button
                  onClick={() => handleStatusFilterChange("Progress")}
                  style={{
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                    background: "#282828",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    padding: "0 10px",
                    marginRight: "20px",
                  }}
                >
                  <p>In Progress</p>
                </button>
                <button
                  onClick={() => handleStatusFilterChange("all")}
                  style={{
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                    background: "#282828",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    padding: "0 10px",
                    marginRight: "20px",
                  }}
                >
                  <p>All</p>
                </button>
              </div>
            </div>
            <Table
              initialData={filteredBookings.map(bookingToTableRow)}
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
                    onChange={(selectedOptions) =>
                      setFacilities(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
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
                marginBottom: "50px",
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
};

export default Bookings;
