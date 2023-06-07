import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, validateUserAsync } from "../../features/userSlice";
import { StyledLogin, GlobalStyle } from "./StyledLogin";
import { ColorRing as Loader } from "react-loader-spinner";
import logo from "../../images/D logo.png";

const Login = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      await dispatch(fetchUsersAsync()).then(async () => {
        const user = await dispatch(
          validateUserAsync({ email, password })
        ).unwrap();
        authDispatch({ type: "LOGIN", payload: { email: user.Email } });
        navigate("/");
      });
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <GlobalStyle />
      <StyledLogin>
        {loading ? (
          <Loader
            type="ThreeDots"
            colors={["white", "black", "#414141", "#8f8f8f", "#212121"]}
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <div className="login-form">
            <div className="login__form__logo">
              <img src={logo} />
              <div style={{ textAlign: "left" }}>
                <h1 style={{ marginBottom: "5px", marginTop: "40px" }}>
                  travl
                </h1>
                <p style={{ marginTop: "0", color: "gray" }}>
                  Hotel Admin Dashboard
                </p>
              </div>
            </div>

            <h3 style={{ letterSpacing: "2px" }}>Sign in to your account</h3>

            <p style={{ width: "80%" }}>
              Use email = <span>admin@admin.com</span> and password
              <span> admin</span> to test the application
            </p>
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                data-cy="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                data-cy="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button data-cy="submit" onClick={handleLogin}>
              Log In
            </button>
          </div>
        )}
      </StyledLogin>
    </div>
  );
};

export default Login;
