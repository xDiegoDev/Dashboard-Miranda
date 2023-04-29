import styled from "styled-components";

export const StyledMain = styled.main`
  position: absolute;
  top: ${({ isLoggedIn }) => (isLoggedIn ? "-200px" : "0")};
  left: ${({ sidebarVisible, isLoggedIn }) =>
    isLoggedIn && sidebarVisible ? "-160px" : isLoggedIn ? "-600px" : "-600px"};
  padding: ${({ isLoggedIn }) => (isLoggedIn ? "100px 5% 0px 5%" : "0")};
  transition: margin-left 0.4s;
  height: ${({ isLoggedIn }) => (isLoggedIn ? "calc(100vh - 200px)" : "100vh")};
  width: ${({ sidebarVisible, isLoggedIn }) =>
    isLoggedIn && sidebarVisible ? "calc(90% - 350px)" : "90%"};
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${({ isLoggedIn }) => (isLoggedIn ? "hidden" : "auto")};
`;
