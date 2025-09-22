import React from "react";

export default function LineUp() {
  return (
    <div style={{marginLeft: "20px", marginRight: "20px", alignItems : "center"}}>
      <div style={{ textAlign: "center", marginBottom : "10px"}}>
        <img
          src="fashion_list.jpg"  // public 폴더에 저장
          alt="전체 일정 이미지"
          style={{
            maxWidth: "100%",   // 화면 너비 안에 맞게 축소
            height: "auto",     // 비율 유지
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom : "10px"}}>
        <img
          src="dance_list.jpg"  // public 폴더에 저장
          alt="전체 일정 이미지"
          style={{
            maxWidth: "100%",   // 화면 너비 안에 맞게 축소
            height: "auto",     // 비율 유지
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
}
