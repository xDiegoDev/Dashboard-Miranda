var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import styled from "styled-components";
var StyledButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  color: ", ";\n"], ["\n  background: ", ";\n  color: ", ";\n"])), function (props) {
    return props.variant ? "rgb(241, 235, 235)" : "rgb(235, 241, 239)";
}, function (props) { return (props.variant ? "rgb(88, 19, 19)" : "rgb(19, 88, 70)"); });
export default StyledButton;
describe("Color and background color", function () {
    test("No props on button", function () {
        render(React.createElement(StyledButton, null, "Test"));
        var button = screen.getByRole("button");
        var buttonStyles = window.getComputedStyle(button);
        expect(buttonStyles.backgroundColor).toBe("rgb(235, 241, 239)");
        expect(buttonStyles.color).toBe("rgb(19, 88, 70)");
    });
    test("Props on button", function () {
        render(React.createElement(StyledButton, { variant: true }, "Test"));
        var button = screen.getByRole("button");
        var buttonStyles = window.getComputedStyle(button);
        expect(buttonStyles.backgroundColor).toBe("rgb(241, 235, 235)");
        expect(buttonStyles.color).toBe("rgb(88, 19, 19)");
    });
});
var templateObject_1;
