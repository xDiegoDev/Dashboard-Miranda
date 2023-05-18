import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Login from "./pages/Login/Login.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Rooms from "./pages/Rooms/Rooms.jsx";
import Users from "./pages/Users/Users.tsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SingleUser from "./pages/Users/SingleUser.tsx";
import { AuthProvider, AuthContext } from "./contexts/AuthContext.tsx";

import { StyledMain } from "./AppStyled.js";
import SingleRoom from "./pages/Rooms/SingleRoom.jsx";
import SingleBooking from "./pages/Bookings/SingleBooking.jsx";
import SingleContact from "./pages/Contact/SingleContact.jsx";

const useAppLocation = () => {
  const location = useLocation();
  const getTitle = (pathname: string) => {
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

  return { location, getTitle };
};

function App() {
  const { authState } = useContext(AuthContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { location, getTitle } = useAppLocation();
  const authDispatch = useContext(AuthContext).authDispatch;

  useEffect(() => {
    if (authState.isLoggedIn && location.pathname === "/login") {
      window.location.reload();
    }
  }, [authState.isLoggedIn, location]);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <StyledMain
      isLoggedIn={authState.isLoggedIn}
      sidebarVisible={sidebarVisible}
    >
      {authState.isLoggedIn && (
        <Header
          handleLogout={handleLogout}
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
          <Route
            path="/users/"
            element={<Users handleLogout={handleLogout} />}
          />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/bookings/" element={<Bookings />} />
          <Route path="/bookings/:id" element={<SingleBooking />} />
          <Route path="/contacts/" element={<Contact />} />
          <Route path="/contacts/:id" element={<SingleContact />} />
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