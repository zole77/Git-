import React, { useEffect, useRef, useState } from "react";
import "../../styles/BoardReadModal.css";
import "../../styles/ReadModal.css";
import { IoIosClose } from "react-icons/io";
import male from "../../img/male.png";
import female from "../../img/female.png";
import { MdAccessTime } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function ReadModal(props) {
    const user = useSelector((state) => state.user);
    const modalBackground = useRef();
    const socket = useRef(); // useRef로 socket을 생성
    const navigate = useNavigate();
    console.log(props.selectedPost);

    const [userId, setUserId] = useState(user.mem_id);
    const [userNickName, setUserNickName] = useState(user.mem_nickname);

    const enterRoom = async (roomId) => {
        console.log(`방 입장: ${roomId}`);

        const response = await axios.get(`/chat/${roomId}/members`, {
            // 해당 유저가 이미 그 방에 있는지 확인
            params: {
                mem_id: userId,
            },
        });
        if (!response.data) {
            console.log("보낼게");
            // 유저가 그 방에 없으면 DB에 추가
            socket.current.send(
                JSON.stringify({
                    type: "ENTER",
                    roomId: roomId,
                    mem_id: userId,
                    sender: userNickName,
                })
            );
        }
    };

    useEffect(() => {
        // WebSocket 연결
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        socket.current.onopen = (event) => {
            console.log("웹소켓 연결됨 good");
        };

        // WebSocket 닫혔을 때
        socket.current.onclose = (event) => {
            console.log("WebSocket Connection Closed", event);
            if (event.code === 1006) {
                console.error("Connection closed abnormally");
            }
        };

        // WebSocket 에러 발생
        socket.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        return () => {
            socket.current.close();
        };
    }, []);

    return (
        <div className="board-modal-overlay">
            <div
                className="board-modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        props.setReadModalOpen(false);
                        document.body.style.overflow = "";
                    }
                }}
            >
                <div
                    className="board-modal-content"
                    style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                >
                    <p className="modal-header">
                        USSUM 같이 가요!
                        <IoIosClose
                            className="modal-x"
                            onClick={() => {
                                props.setReadModalOpen(false);
                                document.body.style.overflow = "";
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </p>
                    <div className="author-created">
                        <p>작성자: {props.postUser.mem_nickname}</p>
                        {props.postUser.mem_gender === "남성" ? (
                            <img
                                src={male}
                                alt="남성"
                                style={{ marginLeft: "5px", width: "15px", height: "15px" }}
                            />
                        ) : (
                            <img
                                src={female}
                                alt="여성"
                                style={{ marginLeft: "5px", width: "15px", height: "15px" }}
                            />
                        )}
                        <p style={{ marginLeft: "auto" }}>
                            {props.selectedPost.withMe_sdate}/{props.selectedPost.withMe_edate}
                        </p>
                    </div>
                    <p style={{ margin: "20px 0", fontSize: "2rem", color: "#007bff" }}>
                        {props.selectedPost.withMe_title}
                    </p>
                    <div className="post-thumbnail">
                        <img src={props.postThumbnail} alt="썸네일" style={{ width: "100%" }} />
                    </div>
                    <div className="withme-condition">
                        <div className="withme-condition-schedule">
                            <MdAccessTime style={{ marginRight: "5px" }} /> 일정:{" "}
                            {props.selectedPost.withMe_sdate}/{props.selectedPost.withMe_edate}
                        </div>
                        <div className="withme-condition-gender">
                            <FaUserFriends style={{ marginRight: "5px" }} /> 동행은{" "}
                            <div style={{ color: "#45c4b1", marginLeft: "5px" }}>
                                {" "}
                                {props.selectedPost.withMe_gender === "male"
                                    ? "남자만"
                                    : props.selectedPost.withMe_gender === "female"
                                    ? "여자만"
                                    : "아무나"}{" "}
                                {props.selectedPost.withMe_pnum}명!
                            </div>
                        </div>
                    </div>
                    <div
                        className="withme-content"
                        style={{
                            width: "100%",
                            height: "300px",
                            textAlign: "left",
                        }}
                    >
                        {props.selectedPost.withMe_content}
                    </div>
                    <div
                        className="room-enter"
                        onClick={() => {
                            enterRoom(props.selectedPost.room_id);
                            navigate("/chat");
                        }}
                    >
                        같이 가요!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadModal;
