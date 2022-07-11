import React, { useEffect, useRef, useState } from "react";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsMicFill,
  BsMicMuteFill,
} from "react-icons/bs";

import { ImExit } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  LocalVideo,
  RemoteVideo,
  RoomBlock,
  Tools,
  Wrap,
} from "./Parts";

import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { add, save } from "../../modules/room";

const constraints = {
  video: true,
  audio: false,
};

let getUserMedia,
  socket,
  dataChannel,
  pc,
  localStream,
  remoteStream,
  saveCounter;

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

  // media
  const [countUser, setCountUser] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const localVideo = useRef();
  const remoteVideo = useRef();

  useEffect(() => {
    // socket server 연결
    socket = io("https://localhost:4000", {
      cors: {
        origin: "*",
      },
    });
    socket.on("connect", () => {
      // 서버 연결 표시
      socket.emit("join", params.id);
      dispatch(add(params.id));
      dispatch(save());

      init();

      // 서버에서 온 메세지
      socket.on("message", (msg) => {
        switch (msg.type) {
          case "offer":
            pc.setRemoteDescription(new RTCSessionDescription(msg))
              .then(() => pc.createAnswer())
              .then(setDescription)
              .then(sendDescription)
              .catch(handleError);
            break;
          case "answer":
            pc.setRemoteDescription(new RTCSessionDescription(msg));
            break;
          case "candidate":
            pc.addIceCandidate(msg.candidate);
            break;
          default:
            return;
        }
      });

      socket.on("userInRoom", (msg) => {
        console.log("[인원 변동] 현재 인원 ", msg);
        saveCounter = msg;
        setCountUser(msg);
      });
    });

    // 카메라 권한 요청
    // getUserMedia
    getUserMedia = navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        localVideo.current.srcObject = localStream = stream;
        console.log("local stream", stream);
        // addStream
        stream.getTracks().forEach((track) => pc?.addTrack(track, stream));
      })
      .catch(handleUserMediaError);

    return () => {
      socket.disconnect();
    };
  }, []);

  function init() {
    // peerConnection 생성
    pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    console.log(pc);

    pc.onicecandidate = function (e) {
      console.log("onicecandidate", e);
      if (e.candidate) {
        socket.send({
          type: "candidate",
          candidate: e.candidate,
        });
      }
    };

    pc.ontrack = function (e) {
      console.log("ontrack", e);
      remoteVideo.current.srcObject = remoteStream = e.streams[0];
    };

    pc.ondatachannel = function (e) {
      dataChannel = e.channel;
      console.log(localStream.getVideoTracks());
      handleData();
      sendData({
        peerMediaStream: {
          video: localStream.getVideoTracks()[0].enabled,
        },
      });
    };

    getUserMedia.then(attachMedia);
  }

  function attachMedia() {
    dataChannel = pc.createDataChannel("chat");
    handleData();
    pc.createOffer()
      .then(setDescription)
      .then(sendDescription)
      .catch(handleError);
  }

  function handleUserMediaError(e) {
    console.log("handleUserMediaError");
    console.error(e.message);
  }

  function setDescription(offer) {
    return pc.setLocalDescription(offer);
  }
  function sendDescription() {
    socket.send(pc.localDescription);
  }
  function handleError(e) {
    console.log("handleError", e);
  }

  function handleData() {
    dataChannel.onmessage = function (e) {
      console.log("onmessage", e);
    };

    dataChannel.onclose = function (e) {
      console.log("onclose", e);
    };
  }

  function sendData(msg) {
    dataChannel.send(JSON.stringify(msg));
  }

  return (
    <RoomBlock>
      <Wrap>
        <RemoteVideo ref={remoteVideo} autoPlay />
        <LocalVideo ref={localVideo} autoPlay />
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
