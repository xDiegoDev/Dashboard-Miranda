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
  /* border: 2px solid white; */
  border-radius: 20px;
  text-align: center;
  margin: auto;
  margin-top: 15%;
  background-color: #0f0f0f;

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
    margin-top: 30px;
    border-radius: 100px;
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
