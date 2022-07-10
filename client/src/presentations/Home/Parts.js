import { Link } from "react-router-dom";
import styled from "styled-components";

const Hr = styled.div`
  height: 1px;
  background: #5d5d5d;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid #dedede;
  border-radius: 0;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
`;

const Room = styled(Link)`
  padding: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  & ${Room} {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid #dedede;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #ffffff12;
    }
  }
`;

const HomeBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export { Hr, Input, Room, List, HomeBlock };
