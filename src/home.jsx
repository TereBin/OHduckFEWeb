import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// 시간 포맷 함수 (연-월-일, 초 제외)
function formatTime(dt) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dt);
}

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleClick = (ev) => {
    if (ev.linkToLineUp) {
      navigate("/lineup");
    }
  };

  // 현재 시간 갱신
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // events.json 불러오기 (public/events.json)
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("일정 불러오기 실패:", err));
  }, []);

  // 시작 시간 순 정렬
  const sorted = useMemo(() => {
    return [...events].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );
  }, [events]);

  // 진행 중인 이벤트만 필터
  const ongoing = sorted.filter(
    (ev) => new Date(ev.start) <= now && now <= new Date(ev.end)
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>

      <section style={{ marginBottom: "2rem" }}>
        <h2>현재 진행 중인 일정</h2>
        {ongoing.length > 0 ? (
          ongoing.map((ev) => (
            < div

              key={ev.id}
              onClick={() => handleClick(ev)}
              style={{
                border: "2px solid #4caf50",
                background: ev.linkToLineUp ? "#e8f5e9" : "#f9fff9",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                cursor: ev.linkToLineUp ? "pointer" : "default",
                position: "relative",   // ✅ 클릭 영역 보장
                zIndex: 10              // ✅ 다른 요소에 안 가려지게
              }}
            >
              <div style={{ fontWeight: "bold" }}>{ev.title}</div>
              {ev.place && (
                <div style={{ fontSize: "0.9rem", color: "#444" }}>
                  장소: {ev.place}
                </div>
              )}
              <div style={{ fontSize: "0.9rem", color: "#555" }}>
                {formatTime(new Date(ev.start))} – {formatTime(new Date(ev.end))}
                {ev.linkToLineUp && (
                  <span style={{ marginLeft: "8px", color: "#2e7d32", fontWeight: "bold" }}>
                    ▶ 라인업 보기
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          (() => {
            const upcoming = sorted.find(ev => new Date(ev.start) > now);
            return upcoming ? (
              <div
                key={upcoming.id}
                onClick={() => handleClick(upcoming)}  // ✅ 클릭 가능
                style={{
                  border: "2px solid #2196f3",
                  background: "#e3f2fd",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  cursor: upcoming.linkToLineUp ? "pointer" : "default",  // ✅ pointer 표시
                }}
              >
                <div style={{ fontWeight: "bold" }}>{upcoming.title}</div>
                {upcoming.place && (
                  <div style={{ fontSize: "0.9rem", color: "#444" }}>
                    장소: {upcoming.place}
                  </div>
                )}
                <div style={{ fontSize: "0.9rem", color: "#555" }}>
                  {formatTime(new Date(upcoming.start))} – {formatTime(new Date(upcoming.end))}
                  {upcoming.linkToLineUp && (
                    <span style={{ marginLeft: "8px", color: "#1976d2", fontWeight: "bold" }}>
                      ● 다음 예정 ▶ 라인업 보기
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ color: "#777" }}>더 이상 예정된 일정 없음</div>
            );
          })()
        )
        }
      </section >

      <section>
        <h2>전체 일정</h2>
        <div style={{ textAlign: "center" }}>
          <img
            src="timetable.jpg"  // public 폴더에 저장
            alt="전체 일정 이미지"
            style={{
              maxWidth: "100%",   // 화면 너비 안에 맞게 축소
              height: "auto",     // 비율 유지
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </section>
    </div >
  );
}
