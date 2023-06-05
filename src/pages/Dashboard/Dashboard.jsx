import React, { useEffect, useState } from "react";

import KingBedIcon from "@mui/icons-material/KingBed";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { DashDivs } from "./StyledDashboard";

import { ContactSlider } from "../Contact/Contact";
import { useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../features/contactSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyles.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    dispatch(fetchContactsAsync);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <DashDivs>
        <div className="info__container">
          <div className="icon">
            <KingBedIcon />
          </div>

          <div className="contained__info">
            <h5>8461</h5>
            <p>New Booking</p>
          </div>
        </div>
        <div className="info__container">
          <div className="icon">
            <EventAvailableIcon />
          </div>

          <div className="contained__info">
            <h5>963</h5>
            <p>Scheduled Room</p>
          </div>
        </div>
        <div className="info__container">
          <div className="icon">
            <LoginIcon />
          </div>

          <div className="contained__info">
            <h5>753</h5>
            <p>Check In</p>
          </div>
        </div>
        <div className="info__container">
          <div className="icon">
            <LogoutIcon />
          </div>

          <div className="contained__info">
            <h5>516</h5>
            <p>Check Out</p>
          </div>
        </div>
      </DashDivs>
      <div style={{ display: "flex" }}>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div style={{ marginTop: "-70px", marginBottom: "50px" }}>
        <ContactSlider />
      </div>
    </div>
  );
};

export default Dashboard;
