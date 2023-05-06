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
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";
import Select from "react-select";

const Rooms = () => {
  const dispatch = useDispatch();
  const roomsData = useSelector((state) => state.rooms.rooms);
  const loading = useSelector((state) => state.rooms.status === "loading");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("roomNumber");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const roomsStatus = useSelector((state) => state.rooms.status);

  const handleFacilitiesChange = (selectedOptions) => {
    setSelectedFacilities(selectedOptions);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRoomsAsync());
    }
  }, [dispatch]);

  const handleDelete = (room) => {
    dispatch(deleteRoomAsync(room.ID));
  };

  const handleAddRoom = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomType = e.target.elements.bedType.value;
    let roomName = "";
    switch (roomType) {
      case "Single Bed":
        roomName = "Deluxe A-";
        break;
      case "Double Bed":
        roomName = "Deluxe B-";
        break;
      case "Double Superior":
        roomName = "Deluxe C-";
        break;
      case "Suite":
        roomName = "Deluxe D-";
        break;
      default:
        roomName = "";
    }

    const imgUrls = e.target.elements.img.value
      .split(",")
      .map((url) => url.trim());

    if (imgUrls.length < 3 || imgUrls.length > 5) {
      alert("Please provide between 3 and 5 image URLs");
      return;
    }

    const newRoom = {
      IMG: imgUrls,
      "Room Name": roomName,
      ID: nanoid(),
      Number: roomsData.length + 1,
      "Bed Type": roomType,
      Facilities: selectedFacilities.map((option) => option.value).join(", "),
      Rate: roomPrices[roomType],
      Offer: e.target.elements.offer.value,
      Status: e.target.elements.status.value,
      Cancellation: e.target.elements.cancellation.value,
    };

    dispatch(addRoomAsync(newRoom));
    setIsModalOpen(false);
  };

  const extractPrice = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ""));
  };

  const getFilteredData = (data, filter) => {
    let filteredData = [...data];

    if (filter === "number") {
      filteredData.sort((a, b) => a["Number"] - b["Number"]);
    } else if (filter === "state") {
      filteredData.sort((a, b) => a.Status.localeCompare(b.Status));
    } else if (filter === "price") {
      filteredData.sort((a, b) => extractPrice(b.Rate) - extractPrice(a.Rate));
    }

    return filteredData;
  };

  const roomPrices = {
    "Single Bed": "$100 / Night",
    "Double Bed": "$200 / Night",
    "Double Superior": "$300 / Night",
    Suite: "$400 / Night",
  };

  const facilityOptions = [
    { value: "TV", label: "TV" },
    { value: "Bathtub", label: "Bathtub" },
    { value: "WiFi", label: "WiFi" },
    { value: "Air Conditioning", label: "Air Conditioning" },
    { value: "24 hour Assistance", label: "24 hour Assistance" },
    { value: "Towels", label: "Towels" },
    { value: "Coffee", label: "Coffee" },
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
              marginTop: "150px",
              display: "flex",
              marginLeft: "12%",
              marginBottom: "-150px",
              color: "white",
            }}
          >
            <label
              htmlFor="filter"
              style={{ fontSize: "20px", letterSpacing: "1.5px" }}
            >
              Filter by:{" "}
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                marginLeft: "18px",
                padding: "10px 20px",
                color: "white",
                border: "1px solid white",
                borderRadius: "10px",
                background: "#212121",
              }}
            >
              <option value="roomNumber">Room Number</option>
              <option value="state">State</option>
              <option value="price">Price</option>
            </select>
          </div>
          <Table
            initialData={getFilteredData(roomsData, filter)}
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
                Image URLs (comma separated)
                <input type="text" id="img" name="img" />
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
                <Select
                  isMulti
                  name="facilities"
                  options={facilityOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleFacilitiesChange}
                />
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
              marginBottom: "50px",
            }}
            onClick={handleAddRoom}
          >
            Add Room
          </button>
        </>
      )}
    </div>
  );
};

export default Rooms;
