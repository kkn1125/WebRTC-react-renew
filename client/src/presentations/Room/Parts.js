import styled, { css } from "styled-components";

const videoStyles = css`
  position: absolute;
`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252525;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  font-size: 25px;
  box-shadow: 0 0 10px 0 #ffffff56;
  color: inherit;
  &:hover {
    background-color: #353535;
    box-shadow: 0 0 15px 0 #ffffff95;
  }
  &:active {
    background-color: #555555;
    box-shadow: 0 0 15px 0 #ffffff95;
  }
  & svg {
    color: inherit;
    display: block;
    min-width: 25px;
  }
`;

const Tools = styled.div`
  position: absolute;
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  bottom: 3rem;
  z-index: 500;
`;

const LocalVideo = styled.video`
  ${videoStyles}
  width: 960px;
  height: 560px;
  background-color: grey;
`;

const RemoteVideo = styled.video`
  ${videoStyles}
  width: 250px;
  height: 160px;
  z-index: 50;
  left: 0;
  background-color: black;
`;

const Wrap = styled.div`
  position: relative;
  width: 960px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RoomBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export { videoStyles, Button, Tools, LocalVideo, RemoteVideo, Wrap, RoomBlock };
