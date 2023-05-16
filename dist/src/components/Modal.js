"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ModalOverlay = styled_components_1.default.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled_components_1.default.div `
  background-color: #1a1919;
  text-align: center;
  padding: 1rem 2rem;
  padding-bottom: 40px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
  position: relative;
  z-index: 1001;
  border: 2px solid #d2d2d2;
`;
const Modal = ({ isOpen, onRequestClose, children }) => {
    if (!isOpen) {
        return null;
    }
    return (react_1.default.createElement(ModalOverlay, { onClick: onRequestClose },
        react_1.default.createElement(ModalContent, { onClick: (e) => e.stopPropagation() }, children)));
};
exports.default = Modal;
