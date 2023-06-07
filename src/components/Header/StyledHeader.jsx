import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #1b1b1b;
  position: fixed;
  top: 0;
  left: ${({ sidebarVisible }) => (sidebarVisible ? "282px" : "0")};
  width: ${({ sidebarVisible }) =>
    sidebarVisible ? "calc(100% - 250px)" : "100%"};
  transition: left 0.4s;
  margin-bottom: 0px;
  z-index: 100;

  div {
    letter-spacing: 2px;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 15px;
    padding: 13px;
  }

  .hamburger__div .hamburger__icon {
    color: white;
    padding: 10px;
    transition: 0.1;
  }

  .hamburger__icon:hover {
    border: 2px solid white;
    border-radius: 100px;
    padding: "10px";
  }

  .icons {
    display: flex;
    justify-content: space-between;
    margin-right: 5%;
    width: 20%;
    color: white;
  }
  div {
    display: flex;
    align-items: center;
    margin-left: 3%;
    div {
      margin-right: 20px;
      //color: #E6E6FA
    }
  }
`;

export const StyledSidebar = styled.div`
  display: ${({ sidebarVisible }) => (sidebarVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  background-color: #202020;
  color: white;
  padding: 16px;
  font-size: 15px;
  min-height: 100vh;

  .logo {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;
    letter-spacing: 3px;

    img {
      width: 60%;
      border: none;
    }
    div {
      margin-left: 10px;
      h1 {
        margin-top: 3px;
        font-size: 28px;
      }
      p {
        font-size: 10px;
        margin-top: -16px;
        color: gray;
        letter-spacing: 1px;
      }
    }
  }

  .white {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    width: 20%;
    color: white;
  }

  .active {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    padding-left: 15%;
    width: 20%;
    color: white;
  }

  .sidebar__fullheight {
    min-height: 100vh;
  }

  .sidebar__spacebetween {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
  }
`;

export const IconsDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 10%;
`;

export const StyledLink = styled(RouterLink)`
  display: flex;
  color: white;
  text-decoration: none;
  align-items: center;
  width: 100%;
  margin-top: 0px;
  height: 50px;
  letter-spacing: 3px;
  font-size: 19px;
`;

export const StyledLinkActive = styled(StyledLink)`
  color: white;
  border-left: 4px solid #010101;
  border-radius: 6px;
  width: 120%;
  margin-left: -16%;
  background-image: linear-gradient(to right, #010101, #8f8f8f);
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #292828;
  margin: auto;
  font-size: 15px;
  border-radius: 20px;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin: auto;
  margin-top: 70px;
  img {
    width: 60px;
    margin-top: -40px;
    border-radius: 20px;
  }
  h6 {
    margin-top: 12px;
    font-size: 19px;
    letter-spacing: 3px;
  }

  p {
    margin-top: -20px;
    font-size: 12px;
    padding-bottom: 10px;
    color: gray;
    letter-spacing: 1px;
  }

  button {
    color: white;
    background-color: #222;
    border-radius: 10px;
    padding: 10px 20px;
    border: 1px solid white;
    font-weight: bold;
    letter-spacing: 2px;
    transition: 0.2s;
  }
  button:hover {
    color: #222;
    background-color: white;
    border-radius: 10px;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
  }
`;

export const SidebarFooter = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 0;
  font-size: 12px;
  margin-top: 30px;
  bottom: 20px;
  left: 30px;
  width: 281px;
  color: white;
  padding-bottom: 10px;
  h6 {
    font-size: 12px;
    letter-spacing: 2px;
  }
  p {
    color: gray;
    letter-spacing: 1.5px;
  }
`;

export const Button = styled.button`
  button {
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    font-weight: bold;
    background-color: white;
  }
`;
