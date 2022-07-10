import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const fontSize = {
  small: 16,
  normal: 24,
  large: 30,
};

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
`;

const NavStyle = css`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.div`
  ${NavStyle}
  font-size: ${({ size }) => fontSize[size]}px;
`;

const Menu = styled(Link)`
  ${NavStyle}
  ${({ size = "normal" }) =>
    css`
      font-size: ${size === "large" ? 36 : 20}px;
    `}
`;

const Nav = styled.nav`
  padding-left: 2rem;
  padding-right: 2rem;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #252525e9;
  border-bottom: 1px solid #252525;
  align-items: center;
  z-index: 100;
`;

const LayoutBlock = styled.div`
  background-color: #353535;
  color: white;
  height: 100%;
  overflow: auto;
`;

export { fontSize, Container, NavStyle, Text, Menu, Nav, LayoutBlock };
