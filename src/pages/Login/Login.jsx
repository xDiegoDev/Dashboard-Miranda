import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, validateUserAsync } from "../../features/userSlice";
import { StyledLogin, GlobalStyle } from "./StyledLogin";
import { ColorRing as Loader } from "react-loader-spinner";

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
    <>
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
