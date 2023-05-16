"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledLogin = exports.GlobalStyle = void 0;
const styled_components_1 = __importStar(require("styled-components"));
exports.GlobalStyle = (0, styled_components_1.createGlobalStyle) `
  body {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;
exports.StyledLogin = styled_components_1.default.div `
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
