var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
var ModalOverlay = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"])));
var ModalContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: #1a1919;\n  text-align: center;\n  padding: 1rem 2rem;\n  padding-bottom: 40px;\n  border-radius: 10px;\n  max-width: 500px;\n  width: 80%;\n  position: relative;\n  z-index: 1001;\n  border: 2px solid #d2d2d2;\n"], ["\n  background-color: #1a1919;\n  text-align: center;\n  padding: 1rem 2rem;\n  padding-bottom: 40px;\n  border-radius: 10px;\n  max-width: 500px;\n  width: 80%;\n  position: relative;\n  z-index: 1001;\n  border: 2px solid #d2d2d2;\n"])));
var Modal = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, children = _a.children;
    if (!isOpen) {
        return null;
    }
    return (React.createElement(ModalOverlay, { onClick: onRequestClose },
        React.createElement(ModalContent, { onClick: function (e) { return e.stopPropagation(); } }, children)));
};
export default Modal;
var templateObject_1, templateObject_2;
