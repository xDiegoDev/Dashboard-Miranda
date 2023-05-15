import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Rooms";
import Users from "./pages/Users/Users";
import Bookings from "./pages/Bookings/Bookings";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleUser from "./pages/Users/SingleUser";
import { AuthProvider, AuthContext } from "./contexts/AuthContext.tsx";
import { StyledMain } from "./AppStyled";
import SingleRoom from "./pages/Rooms/SingleRoom";
import SingleBooking from "./pages/Bookings/SingleBooking";
import SingleContact from "./pages/Contact/SingleContact";
function App() {
    var authState = useContext(AuthContext).authState;
    var _a = useState(false), sidebarVisible = _a[0], setSidebarVisible = _a[1];
    var location = useLocation();
    var authDispatch = useContext(AuthContext).authDispatch;
    useEffect(function () {
        if (authState.isLoggedIn && location.pathname === "/login") {
            window.location.reload();
        }
    }, [authState.isLoggedIn, location]);
    var getTitle = function (pathname) {
        switch (true) {
            case pathname === "/":
                return "Dashboard";
            case pathname === "/rooms":
                return "Rooms";
            case pathname === "/bookings":
                return "Bookings";
            case pathname === "/users":
                return "Users";
            case pathname === "/contacts":
                return "Reviews";
            case /^\/contacts\/[\w-]+$/i.test(pathname):
                return "Contact Details";
            case /^\/users\/[\w-]+$/i.test(pathname):
                return "User Details";
            case /^\/rooms\/[\w-]+$/i.test(pathname):
                return "Room Details";
            case /^\/bookings\/[\w-]+$/i.test(pathname):
                return "Review Details";
            default:
                return "Dashboard";
        }
    };
    var handleLogout = function () {
        authDispatch({ type: "LOGOUT" });
    };
    return (React.createElement(StyledMain, { isLoggedIn: authState.isLoggedIn, sidebarVisible: sidebarVisible },
        authState.isLoggedIn && (React.createElement(Header, { handleLogout: handleLogout, title: getTitle(location.pathname), setSidebarVisible: setSidebarVisible, sidebarVisible: sidebarVisible, isLoggedIn: authState.isLoggedIn })),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
            React.createElement(Route, { path: "/", element: React.createElement(ProtectedRoute, null) },
                React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) }),
                React.createElement(Route, { path: "/rooms/", element: React.createElement(Rooms, null) }),
                React.createElement(Route, { path: "/rooms/:id", element: React.createElement(SingleRoom, null) }),
                React.createElement(Route, { path: "/users/", element: React.createElement(Users, { handleLogout: handleLogout }) }),
                React.createElement(Route, { path: "/users/:id", element: React.createElement(SingleUser, null) }),
                React.createElement(Route, { path: "/bookings/", element: React.createElement(Bookings, null) }),
                React.createElement(Route, { path: "/bookings/:id", element: React.createElement(SingleBooking, null) }),
                React.createElement(Route, { path: "/contacts/", element: React.createElement(Contact, null) }),
                React.createElement(Route, { path: "/contacts/:id", element: React.createElement(SingleContact, null) })),
            React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) }))));
}
var WrappedApp = function () {
    return (React.createElement(AuthProvider, null,
        React.createElement(Router, null,
            React.createElement(App, null))));
};
export default WrappedApp;
