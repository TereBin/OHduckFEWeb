import React from "react";

export default function Map() {
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <img
                    src="map.jpg"  // public 폴더에 저장
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
