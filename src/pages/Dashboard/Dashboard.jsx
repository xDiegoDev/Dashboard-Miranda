import React from "react";

import KingBedIcon from "@mui/icons-material/KingBed";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { DashDivs } from "./StyledDashboard";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
