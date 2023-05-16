"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = exports.UserComp = exports.User = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.User = styled_components_1.default.div `
  margin-top: 200px;
  color: white;
  border-radius: 10px;
  border: 2px solid white;
  text-align: center;
  padding: 20px 50px 20px 50px;
`;
exports.UserComp = styled_components_1.default.div `
  button {
    display: block;
    margin: auto;
    margin-top: 50px;
    padding: 10px 20px;
    color: white;
    font-size: 15px;
    background-color: #222;
    border: 3px solid #414141;
    border-radius: 20px;
  }
`;
exports.Form = styled_components_1.default.form `
  display: flex;
  flex-direction: column;
  color: white;
  label {
    margin-top: 20px;
    margin-bottom: 0;
  }
  input {
    margin-left: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #414141;
    padding: 0 10px;
  }
  select {
    margin-left: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #414141;
    padding: 0 10px;
  }
`;
