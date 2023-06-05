import styled from "styled-components";

export const StyledMain = styled.main`
  box-sizing: border-box;
  margin-top: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  padding: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  transition: all 0.4s;
  width: ${({ sidebarVisible }) =>
    sidebarVisible ? "calc(100% - 320px)" : "100%"};
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${({ isLoggedIn }) => (isLoggedIn ? "auto" : "hidden")};
  margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "300px" : "0")};
`;
