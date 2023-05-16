import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch as useReduxDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  fetchUsersAsync,
  validateUserAsync,
} from "../../features/userSlice.tsx";
import { StyledLogin, GlobalStyle } from "./StyledLogin.jsx";
import { ColorRing as Loader } from "react-loader-spinner";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;
const useDispatch = () => useReduxDispatch<AppDispatch>();

const Login = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        authDispatch({
          type: "LOGIN",
          payload: { email: user.Email, name: user.Name },
        });
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
    <>
      <GlobalStyle />
      <StyledLogin>
        {loading ? (
          <Loader
            colors={["white", "black", "#414141", "#8f8f8f", "#212121"]}
            height={100}
            width={100}
          />
        ) : (
          <div className="login-form">
            <h1>Login</h1>
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
    </>
  );
};

export default Login;
