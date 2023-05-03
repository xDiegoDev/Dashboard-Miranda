import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import { StyledMain } from "./AppStyled";
import SingleRoom from "./pages/Rooms/SingleRoom";
import SingleBooking from "./pages/Bookings/SingleBooking";

function App() {
  const { authState } = useContext(AuthContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (authState.isLoggedIn && location.pathname === "/login") {
      window.location.reload();
    }
  }, [authState.isLoggedIn, location]);

  const getTitle = (pathname) => {
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
        return "Contacts";
      case /^\/contacts\/[\w-]+$/i.test(pathname):
        return "Contact Details";
      case /^\/users\/[\w-]+$/i.test(pathname):
        return "User Details";
      case /^\/rooms\/[\w-]+$/i.test(pathname):
        return "Room Details";
      case /^\/bookings\/[\w-]+$/i.test(pathname):
        return "Booking Details";
      default:
        return "Dashboard";
    }
  };

  return (
    <StyledMain
      isLoggedIn={authState.isLoggedIn}
      sidebarVisible={sidebarVisible}
    >
      {authState.isLoggedIn && (
        <Header
          title={getTitle(location.pathname)}
          setSidebarVisible={setSidebarVisible}
          sidebarVisible={sidebarVisible}
          isLoggedIn={authState.isLoggedIn}
        />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms/" element={<Rooms />} />
          <Route path="/rooms/:id" element={<SingleRoom />} />
          <Route path="/users/" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/bookings/" element={<Bookings />} />
          <Route path="/bookings/:id" element={<SingleBooking />} />
          <Route path="/contact/*" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledMain>
  );
}

const WrappedApp = () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default WrappedApp;
