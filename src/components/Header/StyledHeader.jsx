import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #202020;
  position: fixed;
  top: 0;
  left: ${({ sidebarVisible }) => (sidebarVisible ? "250px" : "0")};
  width: ${({ sidebarVisible }) =>
    sidebarVisible ? "calc(100% - 250px)" : "100%"};
  transition: left 0.4s;
  margin-bottom: 0px;
  z-index: 100;

  .hamburger__div .hamburger__icon {
    color: white;
  }

  .title {
    background-clip: text;
    -webkit-background-clip: text;
    color: white;
    font-size: 30px;
    letter-spacing: 1.5px;
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
  height: 100vh;

  .logo {
    margin-bottom: 30px;
    margin-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;

    img {
      width: 80%;
      margin: auto;
      border: none;
      margin-bottom: -2%;
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
    height: 100%;
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
  background-color: #d4d4d4;
  margin: auto;
  font-size: 15px;
  border-radius: 20px;
  color: #212121;
  width: 80%;
  border: 2px solid #010101;
  padding: 20px 0px;
  img {
    width: 60px;
    margin-top: -40px;
    border-radius: 20px;
  }
  h6 {
    margin-bottom: 0px;
    font-size: 15px;
    padding: 10px 0;
  }

  p {
    font-size: 12px;
    padding: 20px 0;
  }
`;

export const SidebarFooter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 0;
  font-size: 12px;
  margin-top: 30px;
  bottom: 33px;
  left: 0;
  width: 100%;
  background-color: #414141;
  color: white;
  padding-bottom: 10px;
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
