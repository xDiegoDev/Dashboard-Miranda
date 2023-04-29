import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { StyledLogin, GlobalStyle } from "./StyledLogin";

const Login = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Replace these with the correct email and password for your application
    const validEmail = "a@a.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      authDispatch({ type: "LOGIN" });
      navigate("/", { replace: true });
    } else {
      alert("Invalid email or password");
    }
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [authState.isLoggedIn, navigate]);

  return (
    <>
      <GlobalStyle />
      <StyledLogin>
        <div className="login-form">
          <h1>Login</h1>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Log In</button>
        </div>
      </StyledLogin>
    </>
  );
};

export default Login;
