import React from "react";
import styled from "@emotion/styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MainButton = styled.button`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 55px;
  margin: 0 0;
  perspective: 1000px;
  border: none;
  padding: 0px;
  font-size: 19px;
  letter-spacing: 1px;
  background: none;
  filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.1));

  &:hover .container.enabled {
    transform: translateY(27px) rotateX(-90deg);
  }

  &:active .container.enabled {
    transition: transform 0.1s;
    transform: translateY(27px) translateZ(-60px) rotateX(-90deg);
  }
`;

const Container = styled.div`
  top: 0;
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transform: translateZ(-25px);
  transition: transform 0.25s;
  font-family: "Montserrat", sans-serif;
`;

const Side = styled.span`
  top: 0;
  position: absolute;
  transform-style: preserve-3d;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Front = styled(Side)`
  color: #fff;
  background: #000;
  transform: rotateY(0deg) translateZ(25px);
  transition: all 0.5s;

  .disabled & {
    background: #666;
    border-color: #555;
    opacity: 0.15;
  }
`;

const Back = styled(Side)`
  color: #000;
  background: #fff;
  border-color: #333;
  transform: rotateX(90deg) translateZ(25px);
  transition: all 0.2s;

  .disabled & {
    opacity: 0;
  }
`;

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  const enabledClass = "container " + (rest.disabled ? " disabled" : "enabled");
  return (
    <MainButton className={className} {...rest}>
      <Container className={enabledClass}>
        <Front>{children}</Front>
        <Back>{children}</Back>
      </Container>
    </MainButton>
  );
};

export default Button;
