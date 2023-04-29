import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import { authDispatch, AuthContext } from "../contexts/AuthContext";

import {
  StyledHeader,
  StyledSidebar,
  IconsDashboard,
  StyledLink,
  StyledLinkActive,
  UserInfo,
  SidebarFooter,
} from "./StyledHeader";

import Company from "../images/Logo1.png";

import astro from "../images/profile.JPG";

const HamburgerIcon = ({ sidebarVisible, setSidebarVisible }) => {
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <LunchDiningIcon onClick={toggleSidebar} />
    </div>
  );
};

const Header = ({ title, sidebarVisible, setSidebarVisible, isLoggedIn }) => {
  const handleItemClick = () => {
    setSidebarVisible(false);
  };
  const { authDispatch } = useContext(AuthContext);
  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("isLoggedIn");
  };
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      handleLogout();
    }
  }, [isLoggedIn]);

  return (
    <>
      <StyledSidebar sidebarVisible={sidebarVisible}>
        <div className="logo">
          <img src={Company} alt="Company Logo" />
        </div>
        <IconsDashboard>
          {location.pathname === "/" ? (
            <StyledLinkActive to="/" onClick={handleItemClick}>
              <div className="active">
                <DashboardRoundedIcon />
              </div>
              <h6>Dashboard</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/" onClick={handleItemClick}>
              <div className="white">
                <DashboardRoundedIcon />
              </div>
              <h6>Dashboard</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/rooms" ? (
            <StyledLinkActive to="/rooms" onClick={handleItemClick}>
              <div className="active">
                <KeyRoundedIcon />
              </div>
              <h6>Rooms</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/rooms" onClick={handleItemClick}>
              <div className="white">
                <KeyRoundedIcon />
              </div>
              <h6>Rooms</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/bookings" ? (
            <StyledLinkActive to="/bookings" onClick={handleItemClick}>
              <div className="active">
                <CalendarMonthRoundedIcon />
              </div>
              <h6>Bookings</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/bookings" onClick={handleItemClick}>
              <div className="white">
                <CalendarMonthRoundedIcon />
              </div>
              <h6>Bookings</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/users" ? (
            <StyledLinkActive to="/users" onClick={handleItemClick}>
              <div className="active">
                <PersonRoundedIcon />
              </div>
              <h6>Users</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/users" onClick={handleItemClick}>
              <div className="white">
                <PersonRoundedIcon />
              </div>
              <h6>Users</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/contacts" ? (
            <StyledLinkActive to="/contacts" onClick={handleItemClick}>
              <div className="active">
                <ExtensionRoundedIcon />
              </div>
              <h6>Contact</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/contacts" onClick={handleItemClick}>
              <div className="white">
                <ExtensionRoundedIcon />
              </div>
              <h6>Contact</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <UserInfo>
          <img src={astro} />
          <h6>Diego Prieto</h6>
          <p>diego.prieto.dev@gmail.com</p>
          <button>EDIT</button>
        </UserInfo>
        <SidebarFooter>
          <h6>Travi Hotel Admin Dashboard</h6>
          <p>® 2020 All Rights Reserved</p>
          <p>Made with LOVE by Diego</p>
        </SidebarFooter>
      </StyledSidebar>

      <StyledHeader sidebarVisible={sidebarVisible}>
        <div>
          <div>
            <HamburgerIcon
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
            />
          </div>
          <h1>{title}</h1>
        </div>
        <div className="icons">
          <MessageIcon />
          <NotificationsIcon />
          <LogoutIcon onClick={handleLogout} />
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
