import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <img
          src="/logo.png"   // public 폴더에 logo.png 저장
          alt="Home"
          style={{ height: "40px", display: "block" }}
        />
      </Link>
      <Link to="/map" style={{ color: "#fff", textDecoration: "none" }}>지도</Link>
      <Link to="/lineup" style={{ color: "#fff", textDecoration: "none" }}>라인업</Link>
    </header>
  );
}
