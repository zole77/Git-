import React, { useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import { IoIosClose } from "react-icons/io";
import "../../App.css";
import axios from "axios";

function Boardupdate(props) {
    const modalBackground = useRef();
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");

    const updatePost = async (post) => {
        try {
            const response = await axios.post("http://localhost:3000/board/update", post);
            console.log(response.data);
            // 게시글 등록 후 부모 컴포넌트의 fetchPosts 함수 호출
            props.fetchPosts();
        } catch (error) {
            console.error("게시글 수정 에러: ", error);
        }
    };

    const onSubmitBtnClick = () => {
        const content = editorRef.current.getInstance().getMarkdown();

        console.log(title.trim());
        console.log(content.trim());
        // 제목과 내용을 확인

        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        // 포스트 데이터 생성
        const post = {
            post_title: title,
            post_content: content,
            post_no: props.postId,
        };

        // 게시글 저장 함수 호출
        updatePost(post);

        // 모달 닫기
        props.setUpdateModalOpen(false);
    };

    let find = props.boardList.find((x) => x.post_no === props.postId);

    return (
        <div>
            {props.updatemodalOpen ? (
                <div
                    className="modal-container"
                    ref={modalBackground}
                    onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            if (editorRef.current.getInstance().getMarkdown().trim()) {
                                if (
                                    window.confirm(
                                        "작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?"
                                    )
                                ) {
                                    props.setUpdateModalOpen(false);
                                }
                            } else {
                                props.setUpdateModalOpen(false);
                            }
                        }
                    }}
                >
                    <div className="modal-content" style={{ backgroundColor: "#fff" }}>
                        <p className="modal-header">
                            USSUM 여행 커뮤니티
                            <IoIosClose
                                className="modal-x"
                                onClick={() => {
                                    props.setUpdateModalOpen(false);
                                    document.body.style.overflow = "";
                                }}
                                style={{
                                    cursor: "pointer",
                                }}
                            />
                        </p>
                        <div className="author-created">
                            <p>{find.mem_id}</p>
                            <p style={{ marginLeft: "auto" }}>{find.post_date}</p>
                        </div>
                        <p style={{ textAlign: "left" }}>
                            제목
                            <input
                                defaultValue={find.post_title}
                                style={{
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    width: "60%",
                                    height: "32px",
                                    fontSize: "15px",
                                    border: "0",
                                    borderRadius: "15px",
                                    paddingLeft: "10px",
                                    backgroundColor: "rgb(233, 233, 233)",
                                }}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </p>
                        <Editor
                            language="ko-KR"
                            ref={editorRef}
                            height="300px"
                            initialValue={find.post_content || " "}
                            initialEditType="wysiwyg"
                        />
                        <button
                            className="modal-close-btn"
                            onClick={() => {
                                onSubmitBtnClick();
                                props.setUpdateModalOpen(false);
                            }}
                        >
                            수정하기
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Boardupdate;
