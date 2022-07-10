const ADD = "room/ADD";
const READ = "room/READ";
const SAVE = "room/SAVE";
const REMOVE = "room/REMOVE";

export const add = (room) => ({ type: ADD, room });
export const read = () => ({ type: READ });
export const save = () => ({ type: SAVE });
export const remove = (room) => ({ type: REMOVE, room });

const initialState = [];

export default function room(state = initialState, action) {
  switch (action.type) {
    case ADD:
      if (state.indexOf(action.room) === -1) {
        return state.concat(action.room);
      } else {
        return state;
      }
    case READ:
      const webrtcRoom = () => localStorage.getItem("webrtcRoom");
      if (!webrtcRoom()) localStorage.setItem("webrtcRoom", "[]");
      return JSON.parse(webrtcRoom());
    case SAVE:
      localStorage["webrtcRoom"] = JSON.stringify(state);
      return state;
    case REMOVE:
      return state.filter((_) => _ !== action.room);
    default:
      return state;
  }
}
