import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { add, read, save } from "../../modules/room";
import { HomeBlock, Hr, Input, List, Room } from "./Parts";

function Home() {
  const [roomId, setRoomId] = useState(Date.now().toString(36));
  const rooms = useSelector((state) => state.room);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(read());
  }, []);

  const handleChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleAddRoomIfNotExists = (e) => {
    const roomId = e.target.value;
    if (e.key === "Enter") {
      dispatch(add(roomId));
      dispatch(save());
      navigate(`/r/${roomId}`);
    }
  };

  return (
    <HomeBlock>
      <Input
        value={roomId}
        onChange={handleChange}
        onKeyDown={handleAddRoomIfNotExists}
      />
      <Hr />
      <List>
        {rooms.map((room) => (
          <Room key={room} id={room} to={`/r/${room}`}>
            📂 {room} 번 방
          </Room>
        ))}
      </List>
    </HomeBlock>
  );
}

export default Home;
