import React from "react";
import { Routes, Route } from "react-router-dom";
import ServiceIntro from "../routes/ServiceIntro";
import Board from "../routes/Board";
import Main from "../routes/Main";
import Login from "../routes/Login/Login";
import SignUp from "../routes/SignUp/SignUp";
import ModMember from "../routes/MyPage/ModMember";
import ChatRoom from "../routes/Chat/ChatRoom";

function Body() {
    return (
        <div>
            <Routes>
                <Route path="/info" element={<ServiceIntro />} />
                <Route path="/board" element={<Board />} />
                <Route path="*" element={<div>404에러</div>} />
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<ModMember />} />
                <Route path="/chat" element={<ChatRoom />} />
            </Routes>
        </div>
    );
}

export default Body;
