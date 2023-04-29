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
  StyledTitle,
  StyledSidebar,
  Burger,
  Icons,
  IconsWhite,
  IconsDashboard,
  StyledLink,
  StyledLinkActive,
  IconsActive,
  Logo,
  CompLogo,
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
        <Logo>
          <CompLogo src={Company} alt="Company Logo" />
        </Logo>
        <IconsDashboard>
          {location.pathname === "/" ? (
            <StyledLinkActive to="/" onClick={handleItemClick}>
              <IconsActive>
                <DashboardRoundedIcon />
              </IconsActive>
              <h6>Dashboard</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/" onClick={handleItemClick}>
              <IconsWhite>
                <DashboardRoundedIcon />
              </IconsWhite>
              <h6>Dashboard</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/rooms" ? (
            <StyledLinkActive to="/rooms" onClick={handleItemClick}>
              <IconsActive>
                <KeyRoundedIcon />
              </IconsActive>
              <h6>Rooms</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/rooms" onClick={handleItemClick}>
              <IconsWhite>
                <KeyRoundedIcon />
              </IconsWhite>
              <h6>Rooms</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/bookings" ? (
            <StyledLinkActive to="/bookings" onClick={handleItemClick}>
              <IconsActive>
                <CalendarMonthRoundedIcon />
              </IconsActive>
              <h6>Bookings</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/bookings" onClick={handleItemClick}>
              <IconsWhite>
                <CalendarMonthRoundedIcon />
              </IconsWhite>
              <h6>Bookings</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/users" ? (
            <StyledLinkActive to="/users" onClick={handleItemClick}>
              <IconsActive>
                <PersonRoundedIcon />
              </IconsActive>
              <h6>Users</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/users" onClick={handleItemClick}>
              <IconsWhite>
                <PersonRoundedIcon />
              </IconsWhite>
              <h6>Users</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <IconsDashboard>
          {location.pathname === "/contacts" ? (
            <StyledLinkActive to="/contacts" onClick={handleItemClick}>
              <IconsActive>
                <ExtensionRoundedIcon />
              </IconsActive>
              <h6>Contact</h6>
            </StyledLinkActive>
          ) : (
            <StyledLink to="/contacts" onClick={handleItemClick}>
              <IconsWhite>
                <ExtensionRoundedIcon />
              </IconsWhite>
              <h6>Contact</h6>
            </StyledLink>
          )}
        </IconsDashboard>
        <UserInfo>
          <img src={astro} />
          <h6>Diego Prieto</h6>
          <p>diego.prieto.dev@gmail.com</p>
          <button>Edit</button>
        </UserInfo>
        <SidebarFooter>
          <h6>Travi Hotel Admin Dashboard</h6>
          <p>® 2020 All Rights Reserved</p>
          <p>Made with LOVE by Diego</p>
        </SidebarFooter>
      </StyledSidebar>

      <StyledHeader sidebarVisible={sidebarVisible}>
        <StyledTitle>
          <Burger>
            <HamburgerIcon
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
            />
          </Burger>
          <h1>{title}</h1>
        </StyledTitle>
        <Icons>
          <MessageIcon />
          <NotificationsIcon />
          <LogoutIcon onClick={handleLogout} />
        </Icons>
      </StyledHeader>
    </>
  );
};

export default Header;
