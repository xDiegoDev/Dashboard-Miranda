import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import { AuthContext } from "../../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/useAuth";
import { updateUserAsync } from "../../features/userSlice";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

import {
  StyledHeader,
  StyledSidebar,
  IconsDashboard,
  StyledLink,
  StyledLinkActive,
  UserInfo,
  SidebarFooter,
  Button,
} from "./StyledHeader";

import Company from "../../images/D logo.png";

import Modal from "../Modal";

const HamburgerIcon = (props) => {
  const { sidebarVisible, setSidebarVisible, className } = props;
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={className}>
      {sidebarVisible ? (
        <FirstPageIcon onClick={toggleSidebar} />
      ) : (
        <LastPageIcon onClick={toggleSidebar} />
      )}
    </div>
  );
};

const Header = ({ title, sidebarVisible, setSidebarVisible, handleLogout }) => {
  const handleItemClick = () => {
    setSidebarVisible(false);
  };
  const location = useLocation();

  const { isLoggedIn, userEmail } = useAuth();

  const usersData = useSelector((state) => state.users.users);

  const loggedInUser = isLoggedIn
    ? usersData.find((u) => u.Email === userEmail)
    : null;

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
      if (loggedInUser.Email !== updatedUser.Email) {
        authDispatch({
          type: "UPDATE_USER",
          payload: { email: updatedUser.Email, name: updatedUser.Name },
        });
      }
      setIsModalOpen(false);
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
              border: "3px solid #414141",
              borderRadius: "10px",
              alignItems: "center",
            }}
          />
          <div>
            <h1>travl</h1>
            <p>Hotel Admin Dashboard</p>
          </div>
        </div>
        <div className="sidebar__fullheight">
          <div className="sidebar__spacebetween">
            <IconsDashboard>
              {location.pathname === "/" ? (
                <StyledLinkActive to="/">
                  <div className="active">
                    <DashboardRoundedIcon />
                  </div>
                  <h6>Dashboard</h6>
                </StyledLinkActive>
              ) : (
                <StyledLink to="/">
                  <div className="white">
                    <DashboardRoundedIcon />
                  </div>
                  <h6>Dashboard</h6>
                </StyledLink>
              )}
            </IconsDashboard>
            <IconsDashboard>
              {location.pathname === "/rooms" ? (
                <StyledLinkActive to="/rooms">
                  <div className="active">
                    <KeyRoundedIcon />
                  </div>
                  <h6>Rooms</h6>
                </StyledLinkActive>
              ) : (
                <StyledLink to="/rooms">
                  <div className="white">
                    <KeyRoundedIcon />
                  </div>
                  <h6>Rooms</h6>
                </StyledLink>
              )}
            </IconsDashboard>
            <IconsDashboard>
              {location.pathname === "/bookings" ? (
                <StyledLinkActive to="/bookings">
                  <div className="active">
                    <CalendarMonthRoundedIcon />
                  </div>
                  <h6>Bookings</h6>
                </StyledLinkActive>
              ) : (
                <StyledLink to="/bookings">
                  <div className="white">
                    <CalendarMonthRoundedIcon />
                  </div>
                  <h6>Bookings</h6>
                </StyledLink>
              )}
            </IconsDashboard>
            <IconsDashboard>
              {location.pathname === "/users" ? (
                <StyledLinkActive to="/users" data-cy="Users">
                  <div className="active">
                    <PersonRoundedIcon />
                  </div>
                  <h6>Users</h6>
                </StyledLinkActive>
              ) : (
                <StyledLink to="/users" data-cy="Users">
                  <div className="white">
                    <PersonRoundedIcon />
                  </div>
                  <h6>Users</h6>
                </StyledLink>
              )}
            </IconsDashboard>
            <IconsDashboard>
              {location.pathname === "/contacts" ? (
                <StyledLinkActive to="/contacts">
                  <div className="active">
                    <ExtensionRoundedIcon />
                  </div>
                  <h6>Contact</h6>
                </StyledLinkActive>
              ) : (
                <StyledLink to="/contacts">
                  <div className="white">
                    <ExtensionRoundedIcon />
                  </div>
                  <h6>Contact</h6>
                </StyledLink>
              )}
            </IconsDashboard>
            <UserInfo>
              {loggedInUser && (
                <>
                  <img src={loggedInUser.IMG} alt="User Profile" />
                  <h6>{loggedInUser.Name}</h6>
                  <p>{loggedInUser.Email}</p>
                  <button onClick={handleEditClick}>EDIT</button>
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
            <h2
              style={{
                marginBottom: "30px",
                fontSize: "27px",
              }}
            >
              EDIT USER
            </h2>
            <form onSubmit={handleEditSubmit}>
              <label
                style={{
                  marginBottom: "32px",
                  fontSize: "17px",
                }}
              >
                Name:
                <input
                  style={{
                    marginLeft: "30px",
                    marginBottom: "20px",
                    height: "30px",
                    borderRadius: "10px",
                    border: "2px solid #414141",
                    paddingLeft: "10px",
                    fontSize: "15px",
                  }}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </label>
              <br />
              <label
                style={{
                  fontSize: "17px",
                }}
              >
                Email:
                <input
                  style={{
                    marginLeft: "30px",
                    marginBottom: "20px",
                    height: "30px",
                    borderRadius: "10px",
                    border: "2px solid #414141",
                    paddingLeft: "10px",
                    fontSize: "15px",
                  }}
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </label>
              <br />
              <button
                style={{
                  marginTop: "32px",
                  height: "30px",
                  borderRadius: "10px",
                  border: "2px solid #414141",
                  padding: "0 10px",
                  fontSize: "15px",
                }}
                onSubmit={handleEditSubmit}
              >
                Save
              </button>
              <button
                style={{
                  marginTop: "32px",
                  marginLeft: "30px",
                  height: "30px",
                  borderRadius: "10px",
                  border: "2px solid #414141",
                  padding: "0 10px",
                  fontSize: "15px",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </Modal>
        </>

        <SidebarFooter>
          <h6>Travl Hotel Admin Dashboard</h6>
          <p style={{ marginTop: "0px", marginBottom: "40px" }}>
            ® 2020 All Rights Reserved
          </p>
          <p>Made with LOVE by Diego</p>
        </SidebarFooter>
      </StyledSidebar>

      <StyledHeader sidebarVisible={sidebarVisible}>
        <div>
          <div className="hamburger__div" data-cy="burger">
            <HamburgerIcon
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
              className="hamburger__icon"
            />
          </div>
          <h1 style={{ width: "300px", color: "white" }} className="title">
            {title}
          </h1>
        </div>
        <div className="icons">
          <MessageIcon />
          <NotificationsIcon />
          <LogoutIcon onClick={handleLogout} data-cy="logout" />
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
