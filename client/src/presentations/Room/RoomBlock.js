import React, { useState } from "react";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsMicFill,
  BsMicMuteFill,
} from "react-icons/bs";

import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
  Button,
  LocalVideo,
  RemoteVideo,
  RoomBlock,
  Tools,
  Wrap,
} from "./Parts";

function Room() {
  const [toggleMic, setToggleMic] = useState(true);
  const [toggleShow, setToggleShow] = useState(true);
  const navigate = useNavigate();

  const handleToggleMic = (e) => {
    setToggleMic(!toggleMic);
  };
  const handleToggleShow = (e) => {
    setToggleShow(!toggleShow);
  };
  const handleExit = (e) => {
    navigate("/");
  };

  return (
    <RoomBlock>
      <Wrap>
        <RemoteVideo />
        <LocalVideo />
      </Wrap>
      <Tools>
        <Button onClick={handleToggleMic}>
          {toggleMic ? <BsMicFill /> : <BsMicMuteFill />}
        </Button>
        <Button onClick={handleToggleShow}>
          {toggleShow ? <BsEyeFill /> : <BsEyeSlashFill />}
        </Button>
        <Button onClick={handleExit}>
          <ImExit />
        </Button>
      </Tools>
    </RoomBlock>
  );
}

export default Room;
