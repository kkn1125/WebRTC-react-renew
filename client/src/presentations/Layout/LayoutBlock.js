import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Container, LayoutBlock, Menu, Nav, Text } from "./Parts";

function Layout() {
  const locate = useLocation();
  const params = useParams();

  const isRoom = locate.pathname.startsWith("/r/");

  const rooms = useSelector((state) => state.room);

  return (
    <LayoutBlock>
      <Nav>
        <Menu to='/' size='large'>
          WebRTC Test
        </Menu>
        {isRoom && <Text size='small'>{params.id} 번 방</Text>}
        {!isRoom && rooms.length > 0 && (
          <Menu to={`/r/${rooms[rooms.length - 1]}`}>Latest Room ▶️</Menu>
        )}
      </Nav>
      <Container>
        <Outlet />
      </Container>
    </LayoutBlock>
  );
}

export default Layout;
