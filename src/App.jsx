import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";     // 기존 home.jsx
import Map from "./map";       // 새로 만들 파일
import LineUp from "./lineup"; // 새로 만들 파일
import Navbar from "./Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* 모든 페이지에서 항상 보임 */}
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/lineup" element={<LineUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
