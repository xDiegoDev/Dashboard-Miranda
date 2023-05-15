import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import styled from "styled-components";

interface StyledButtonProps {
  variant?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: ${(props) =>
    props.variant ? "rgb(241, 235, 235)" : "rgb(235, 241, 239)"};
  color: ${(props) => (props.variant ? "rgb(88, 19, 19)" : "rgb(19, 88, 70)")};
`;

export default StyledButton;

describe("Color and background color", () => {
  test("No props on button", () => {
    render(<StyledButton>Test</StyledButton>);

    const button = screen.getByRole("button");
    const buttonStyles = window.getComputedStyle(button);

    expect(buttonStyles.backgroundColor).toBe("rgb(235, 241, 239)");
    expect(buttonStyles.color).toBe("rgb(19, 88, 70)");
  });

  test("Props on button", () => {
    render(<StyledButton variant={true}>Test</StyledButton>);

    const button = screen.getByRole("button");
    const buttonStyles = window.getComputedStyle(button);

    expect(buttonStyles.backgroundColor).toBe("rgb(241, 235, 235)");
    expect(buttonStyles.color).toBe("rgb(88, 19, 19)");
  });
});
