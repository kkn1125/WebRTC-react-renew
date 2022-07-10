import { Routes, Route } from "react-router-dom";
import Home from "./presentations/Home";
import Layout from "./presentations/Layout";
import Room from "./presentations/Room";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='r/:id' element={<Room />} />
      </Route>
    </Routes>
  );
}

export default App;
