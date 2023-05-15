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
var Dashboard = function () {
    var dispatch = useDispatch();
    var _a = useState(new Date()), value = _a[0], onChange = _a[1];
    useEffect(function () {
        dispatch(fetchContactsAsync);
    }, [dispatch]);
    return (React.createElement("div", { style: { width: "100%" } },
        React.createElement(DashDivs, null,
            React.createElement("div", { className: "info__container" },
                React.createElement("div", { className: "icon" },
                    React.createElement(KingBedIcon, null)),
                React.createElement("div", { className: "contained__info" },
                    React.createElement("h5", null, "8461"),
                    React.createElement("p", null, "New Booking"))),
            React.createElement("div", { className: "info__container" },
                React.createElement("div", { className: "icon" },
                    React.createElement(EventAvailableIcon, null)),
                React.createElement("div", { className: "contained__info" },
                    React.createElement("h5", null, "963"),
                    React.createElement("p", null, "Scheduled Room"))),
            React.createElement("div", { className: "info__container" },
                React.createElement("div", { className: "icon" },
                    React.createElement(LoginIcon, null)),
                React.createElement("div", { className: "contained__info" },
                    React.createElement("h5", null, "753"),
                    React.createElement("p", null, "Check In"))),
            React.createElement("div", { className: "info__container" },
                React.createElement("div", { className: "icon" },
                    React.createElement(LogoutIcon, null)),
                React.createElement("div", { className: "contained__info" },
                    React.createElement("h5", null, "516"),
                    React.createElement("p", null, "Check Out")))),
        React.createElement("div", { style: { display: "flex" } },
            React.createElement(Calendar, { onChange: onChange, value: value })),
        React.createElement("div", { style: { marginTop: "-70px", marginBottom: "50px" } },
            React.createElement(ContactSlider, null))));
};
export default Dashboard;
