import styled from "styled-components";

export const StyledMain = styled.main`
  margin-top: ${({ isLoggedIn }) => (isLoggedIn ? "-300px" : "0")};
  margin-left: ${({ sidebarVisible, isLoggedIn }) =>
    isLoggedIn && sidebarVisible ? "330px" : "130px"};
  padding: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  transition: all 0.4s;
  height: ${({ isLoggedIn }) => (isLoggedIn ? "calc(100vh - 100px)" : "100vh")};
  width: ${({ sidebarVisible, isLoggedIn }) =>
    isLoggedIn && sidebarVisible ? "calc(90% - 300px)" : "80%"};
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${({ isLoggedIn }) => (isLoggedIn ? "auto" : "hidden")};
`;
