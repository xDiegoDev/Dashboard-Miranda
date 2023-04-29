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
  left: ${({ sidebarVisible }) => (sidebarVisible ? "300px" : "0")};
  width: ${({ sidebarVisible }) =>
    sidebarVisible ? "calc(100% - 300px)" : "100%"};
  transition: left 0.4s;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3%;
`;

export const StyledSidebar = styled.div`
  display: ${({ sidebarVisible }) => (sidebarVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: #202020;
  color: white;
  padding: 16px;
  font-size: 150%;
`;

export const Burger = styled.div`
  margin-right: 20px;
  // color: #135846;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
  width: 20%;
  color: #135846;
`;
export const IconsWhite = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10%;
  width: 20%;
  color: white;
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
  border-left: 7px solid red;
  border-radius: 6px;
  width: 100%;
  margin-left: -16%;
`;

export const IconsActive = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10%;
  padding-left: 15%;
  width: 20%;
  color: red;
`;

export const Logo = styled.div`
  margin-bottom: 10%;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompLogo = styled.img`
  width: 80%;
  margin: auto;
  border: none;
  margin-bottom: -2%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 180px;
  background-color: #787878;
  padding-bottom: 10%;
  margin: auto;
  margin-top: 60px;
  font-size: 20px;
  img {
    width: 80px;
    margin-top: -40px;
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 0;
  font-size: 18px;
  margin-top: 30px;
`;
