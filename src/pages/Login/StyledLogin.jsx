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
  width: 50%;
  max-width: 500px;
  border: 2px solid white;
  border-radius: 20px;
  text-align: center;
  margin: auto;
  margin-top: 15%;

  h1 {
    color: white;
    margin-bottom: 30px;
    text-decoration: underline;
  }
  label {
    margin-bottom: 20px;
  }

  .login-form {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 150%;
    margin-bottom: 40px;
    input {
      width: 250px;
      padding: 10px;
      border-radius: 10px;
    }
  }

  button {
    align-self: center;
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
  }
`;
