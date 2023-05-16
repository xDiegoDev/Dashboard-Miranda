"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledMain = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.StyledMain = styled_components_1.default.main `
  margin-top: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "350px" : "30px")};
  padding: ${({ isLoggedIn }) => (isLoggedIn ? "0" : "0")};
  transition: all 0.4s;
  width: ${({ sidebarVisible, isLoggedIn }) => isLoggedIn && sidebarVisible ? "calc(100% - 300px)" : "100%"};
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${({ isLoggedIn }) => (isLoggedIn ? "auto" : "hidden")};
  margin: auto;
  margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "350px" : "auto")};
`;
