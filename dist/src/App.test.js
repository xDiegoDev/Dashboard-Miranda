"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("@testing-library/jest-dom");
const react_2 = require("@testing-library/react");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledButton = styled_components_1.default.button `
  background: ${(props) => props.variant ? "rgb(241, 235, 235)" : "rgb(235, 241, 239)"};
  color: ${(props) => (props.variant ? "rgb(88, 19, 19)" : "rgb(19, 88, 70)")};
`;
exports.default = StyledButton;
describe("Color and background color", () => {
    test("No props on button", () => {
        (0, react_2.render)(react_1.default.createElement(StyledButton, null, "Test"));
        const button = react_2.screen.getByRole("button");
        const buttonStyles = window.getComputedStyle(button);
        expect(buttonStyles.backgroundColor).toBe("rgb(235, 241, 239)");
        expect(buttonStyles.color).toBe("rgb(19, 88, 70)");
    });
    test("Props on button", () => {
        (0, react_2.render)(react_1.default.createElement(StyledButton, { variant: true }, "Test"));
        const button = react_2.screen.getByRole("button");
        const buttonStyles = window.getComputedStyle(button);
        expect(buttonStyles.backgroundColor).toBe("rgb(241, 235, 235)");
        expect(buttonStyles.color).toBe("rgb(88, 19, 19)");
    });
});
