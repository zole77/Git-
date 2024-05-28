import React, { useEffect, useState } from "react";
import WithMePost from "./WithMePost";
import { Link } from "react-router-dom";
import WriteModal from "./WriteModal"; // WriteModal 컴포넌트 import
import ReadModal from "./ReadModal";
import "../../styles/Withme.css";
import axios from "axios";
import KakaoMap from './KakaoMap';

function Withme() {
    const [selectedModal, setSelectedModal] = useState(null);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // WriteModal 열림 상태를 관리하는 상태
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 광역시 상태를 관리하는 상태
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [withMePost, setWithMePost] = useState();

    const [readModalOpen, setReadModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(false);
    const [postUser, setPostUser] = useState(null);
    const [postThumbnail, setPostThumbnail] = useState();

    const fetchWithMePost = async () => {
        try {
            const response = await axios.get("withme/getall");
            setWithMePost(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchWithMePost();
    }, []);

    const dropdownOptions = {
        서울광역시: ["종로구", "용산구", "성동구", "강북구", "서대문구", "마포구"],
        부산광역시: ["해운대구", "사하구", "수정구", "사상구", "금정구"],
        대구광역시: ["수성구", "동구", "서구", "북구", "달서구"],
        인천광역시: ["중구", "동구", "미추홀구", "연수구", "남동구"],
        대전광역시: ["동구", "서구", "중구", "유성구", "대덕구"],
    };

    const handleModalClick = (title) => {
        setSelectedModal(title);
    };

    const handleButtonClick = () => {
        setIsWriteModalOpen(true); // 글쓰기 버튼 클릭 시 WriteModal 열기
    };

    const handleCitySelect = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        setSelectedDistrict(""); // 시 변경될 때 구 초기화
        console.log("Selected City: ", selectedCity);
    };

    const handleDistrictSelect = (event) => {
        const selectedDistrict = event.target.value;
        setSelectedDistrict(selectedDistrict);
        console.log("Selected District: ", selectedDistrict);
    };

    // WriteModal을 닫는 함수
    const handleCloseWriteModal = () => {
        setIsWriteModalOpen(false);
    };

    if (!Array.isArray(withMePost) || withMePost.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Withme">
            <section className="left-section">
                <div className="dropdown-row">
                    <div className={`dropdown-container ${selectedCity ? "active" : ""}`}>
                        <select onChange={handleCitySelect}>
                            <option value="">광역시 선택</option>
                            {Object.keys(dropdownOptions).map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`dropdown-container ${selectedCity ? "active" : ""}`}>
                        <select onChange={handleDistrictSelect} disabled={!selectedCity}>
                            <option value="">구 선택</option>
                            {selectedCity && dropdownOptions[selectedCity].map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <h3>당신 근처의 같이가요!</h3>
                <div className="withme-modal-container">
                    {withMePost.map((post) => (
                        <div className="modal-wrapper" key={post.withMe_id}>
                            <WithMePost
                                post={post}
                                setSelectedPost={setSelectedPost}
                                setReadModalOpen={setReadModalOpen}
                                setPostUser={setPostUser}
                                setPostThumbnail={setPostThumbnail}
                            />
                        </div>
                    ))}
                </div>
            </section>
            {readModalOpen && selectedPost && (
                <ReadModal
                    selectedPost={selectedPost}
                    postThumbnail={postThumbnail}
                    setReadModalOpen={setReadModalOpen}
                    postUser={postUser}
                />
            )}

            <div className="divider"></div>
            <section className="right-section">
                <div className="location-text">
                    같이 갈 위치 : {selectedCity} {selectedDistrict}
                    <button className="write-button" onClick={handleButtonClick}>
                        글쓰기
                    </button>
                </div>
                <div className="map-container">
                    <KakaoMap selectedCity={selectedCity} selectedDistrict={selectedDistrict} />
                </div>
            </section>
            {/* WriteModal이 열려있는 경우에만 렌더링 */}
            {isWriteModalOpen && <WriteModal onClose={handleCloseWriteModal} />}
        </div>
    );
}

export default Withme;
