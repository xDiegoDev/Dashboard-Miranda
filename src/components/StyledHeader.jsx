import styled from "styled-components";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #202020;
  color: white;
  position: fixed;
  top: 0;
  left: ${({ sidebarVisible }) => (sidebarVisible ? "250px" : "0")};
  width: ${({ sidebarVisible }) =>
    sidebarVisible ? "calc(100% - 250px)" : "100%"};
  transition: left 0.4s;
  .icons {
    display: flex;
    justify-content: space-between;
    margin-right: 5%;
    width: 20%;
    color: #135846;
  }
  div {
    display: flex;
    align-items: center;
    margin-left: 3%;
    div {
      margin-right: 20px;
      //color: #135846;
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
    margin-bottom: 10%;
    margin-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

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
    color: red;
  }
`;

export const IconsDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 10%;
  margin-top: -10px;
`;

export const StyledLink = styled(RouterLink)`
  display: flex;
  color: white;
  text-decoration: none;
  align-items: center;
  width: 100%;
`;

export const StyledLinkActive = styled(StyledLink)`
  color: red;
  border-left: 4px solid red;
  border-radius: 6px;
  width: 100%;
  margin-left: -16%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 180px;
  background-color: #e5e5e5;
  padding-bottom: 10%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 15px;
  border-radius: 20px;
  color: #202020;
  width: 80%;
  img {
    width: 60px;
    margin-top: -40px;
    border-radius: 20px;
  }
  h6 {
    margin-bottom: 0px;
    font-size: 15px;
  }

  button {
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 0;
  font-size: 12px;
  margin-top: 30px;
`;
