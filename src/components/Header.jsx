import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../contexts/useAuth";
import { updateUserAsync } from "../features/userSlice";

import {
  StyledHeader,
  StyledSidebar,
  IconsDashboard,
  StyledLink,
  StyledLinkActive,
  UserInfo,
  SidebarFooter,
} from "./StyledHeader";

import Company from "../images/D logo.png";

import astro from "../images/profile.JPG";
import Modal from "./Modal";

const HamburgerIcon = (props) => {
  const { sidebarVisible, setSidebarVisible, className } = props;
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={className}>
      <LunchDiningIcon onClick={toggleSidebar} />
    </div>
  );
};

const Header = ({ title, sidebarVisible, setSidebarVisible }) => {
  const handleItemClick = () => {
    setSidebarVisible(false);
  };
  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
  };
  const location = useLocation();

  const { isLoggedIn, userEmail, userName } = useAuth();

  const usersData = useSelector((state) => state.users.users);

  const loggedInUser = isLoggedIn
    ? usersData.find((u) => u.Email === userEmail)
    : null;

  useEffect(() => {
    if (!isLoggedIn) {
      handleLogout();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("loggedInUser", loggedInUser);
    console.log(usersData);
    console.log(userEmail);
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) {
      handleLogout();
    }
  }, [loggedInUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const dispatch = useDispatch();
  const authDispatch = useContext(AuthContext).authDispatch;

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...loggedInUser,
      Email: editedEmail,
      Name: editedName,
    };
    try {
      await dispatch(updateUserAsync(updatedUser));
      authDispatch({
        type: "UPDATE_USER",
        payload: { email: updatedUser.Email, name: updatedUser.Name },
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleEditClick = () => {
    setEditedName(loggedInUser.Name);
    setEditedEmail(loggedInUser.Email);
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledSidebar sidebarVisible={sidebarVisible}>
        <div className="logo">
          <img
            src={Company}
            alt="Personal Logo"
            style={{
              width: "70px",
              marginBottom: "20px",
              display: "block",
              margin: "auto",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          />
        </div>
        <div className="sidebar__fullheight">
          <div className="sidebar__spacebetween">
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
            <UserInfo style={{ border: "1px solid #9966cc;" }}>
              {loggedInUser && (
                <>
                  <img src={loggedInUser.IMG} />
                  <h6>{loggedInUser.Name}</h6>
                  <p>{loggedInUser.Email}</p>
                  <button
                    onClick={handleEditClick}
                    style={{ color: "#9966cc", backgroundColor: "#222" }}
                  >
                    EDIT
                  </button>
                </>
              )}
            </UserInfo>
          </div>
        </div>

        <>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <h2>Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </label>
              <br />
              <button onSubmit={handleEditSubmit}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </Modal>
          {/* Rest of the Header component JSX */}
        </>

        <SidebarFooter>
          <h6>Travi Hotel Admin Dashboard</h6>
          <p>® 2020 All Rights Reserved</p>
          <p>Made with LOVE by Diego</p>
        </SidebarFooter>
      </StyledSidebar>

      <StyledHeader sidebarVisible={sidebarVisible}>
        <div>
          <div className="hamburger__div">
            <HamburgerIcon
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
              className="hamburger__icon"
            />
          </div>
          <h1 style={{ width: "300px" }} className="title">
            {title}
          </h1>
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
