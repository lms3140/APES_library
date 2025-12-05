import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost8080/");
    };
  }, []);

  return (
    <div>
      <h1>Klover 리뷰</h1>
      <p>* 기간 및 조건 내 작성한 리뷰 조회 가능합니다.</p>

      {reviews.length > 0 ? (
        <div>
          <div>
            <img src={"이미지"} alt="책이미지" />
            <div>
              <p>책제목</p>
              <p>저자</p>
            </div>
          </div>

          <div>
            <div>
              <p>구매리뷰</p>
              <p>별점</p>
            </div>
            <div>
              <p>
                아이디(앞 두글자만 보이고 나머지 **처리) <div></div> 작성날짜{" "}
                <div></div> <button>삭제</button>
              </p>
            </div>
          </div>

          <div>리뷰내용</div>
        </div>
      ) : (
        <div>
          <img src="/images/mypage/ico_nodata.png" alt="" />
          <p>작성한 리뷰가 없습니다.</p>
          <p>교보문고의 다양한 상품과 콘텐츠를 둘러보세요!</p>
          <button onClick={() => navigate("/")}>둘러보기</button>
        </div>
      )}
    </div>
  );
}
