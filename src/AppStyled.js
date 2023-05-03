import styled from "styled-components";

export const StyledMain = styled.main`
  margin-top: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "350px" : "30px")};
  padding: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  transition: all 0.4s;
  width: ${({ sidebarVisible, isLoggedIn }) =>
    isLoggedIn && sidebarVisible ? "calc(90% - 300px)" : "80%"};
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${({ isLoggedIn }) => (isLoggedIn ? "auto" : "hidden")};
  margin: auto;
  margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "350px" : "auto")};
`;
