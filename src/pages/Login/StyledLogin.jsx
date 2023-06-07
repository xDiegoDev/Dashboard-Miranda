import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;

export const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 650px;
  border-radius: 20px;
  text-align: center;
  margin: auto;
  background-color: #0f0f0f;
  letter-spacing: 2px;
  margin-top: 6.5%;

  p {
    margin-bottom: 50px;
    font-size: 15px;
  }

  span {
    font-weight: bold;
    font-size: 18px;
  }

  img {
    width: 80px;
    border-radius: 100px;
    margin-right: 30px;
  }

  h1 {
    color: white;
    margin-bottom: 30px;
  }
  label {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    .login__form__logo {
      letter-spacing: 2px;
      margin-top: 50px;
      display: flex;
      width: 100%;
      margin: auto;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      img {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 40px;

    input {
      width: 350px;
      padding: 10px;
      border-radius: 10px;
    }
  }

  button {
    align-self: center;
    margin-bottom: 80px;
    padding: 10px 40px;
    font-size: 15px;
    font-weight: bold;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    transition: 0.1s;
  }

  button:hover {
    border: 1px solid white;
    background-color: #000000;
    color: white;
    padding: 15px 60px;
  }
`;
