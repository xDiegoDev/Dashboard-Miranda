import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import KingBedIcon from "@mui/icons-material/KingBed";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { DashDivs } from "./StyledDashboard";
import { ContactSlider } from "../Contact/Contact";
import { fetchContactsAsync } from "../../features/contactSlice";
import { BookingContainer } from "./StyledDashboard";
import styled from "styled-components";

const Link = styled(RouterLink)`
  text-decoration: none;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, []);

  return (
    <div style={{ width: "100%", marginTop: "50px" }}>
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

      <BookingContainer>
        <div className="booking__container" style={{ marginBottom: "40px" }}>
          <img src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
          <div>
            <h2>Deluxe A-1</h2>
            <div className="booking__container__user">
              <img
                src="https://images.unsplash.com/photo-1635863138275-d9b33299680b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXJvbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                alt="guest picture"
              />
              <p>Toni Stark</p>
              <p style={{ marginRight: "30px", marginLeft: "30px" }}>
                13 min ago
              </p>
            </div>
          </div>
          <div className="booking__dates">16, 17, 18</div>
        </div>
        <div className="booking__container" style={{ marginBottom: "40px" }}>
          <img src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
          <div>
            <h2>Deluxe A-2</h2>
            <div className="booking__container__user">
              <img
                src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="guest picture"
              />
              <p>Peter Parker</p>
              <p style={{ marginRight: "30px", marginLeft: "30px" }}>
                13 min ago
              </p>
            </div>
          </div>
          <div className="booking__dates__progress">20</div>
        </div>
        <div className="booking__container">
          <img src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
          <div>
            <h2>Deluxe A-3</h2>
            <div className="booking__container__user">
              <img
                src="https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGlyb25tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt="guest picture"
              />
              <p>Thanos</p>
              <p style={{ marginRight: "30px", marginLeft: "30px" }}>
                13 min ago
              </p>
            </div>
          </div>
          <div className="booking__dates__checkin">3</div>
        </div>
        <button className="booking__more">
          <Link to="/bookings">
            <p>View More</p>
          </Link>
        </button>
      </BookingContainer>

      <div style={{ marginTop: "-70px", marginBottom: "50px" }}>
        <ContactSlider />
      </div>
    </div>
  );
};

export default Dashboard;
