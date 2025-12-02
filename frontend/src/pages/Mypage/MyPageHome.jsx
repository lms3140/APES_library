import { Link } from "react-router-dom";
import myPageStyle from "./MyPageHome.module.css";
import { useEffect, useState } from "react";

const fakeData = {
  imageUrl:
    "https://image.aladin.co.kr/product/37609/38/cover200/k842032742_1.jpg",
  title: "픽미업 1",
};

export function MyPageHome() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await fetch("http://localhost:8080/inquiry/member", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("문의내역을 불러올 수 없습니다.");
        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className={myPageStyle.content}>
      <div className={myPageStyle.myPageSection}>
        {/* 구매목록 몇건 나오게하기 */}
        <div className={myPageStyle.myPageCard}>
          <h3>구매내역</h3>
          <img src={fakeData.imageUrl} alt={fakeData.title} />
          <Link>구매내역 바로가기</Link>
        </div>
        {/* 최근찜목록 캐러셀 추가? */}
        <div className={myPageStyle.myPageCard}>
          <h3>찜목록</h3>
          <img src={fakeData.imageUrl} alt={fakeData.title} />
          <Link>찜목록 바로가기</Link>
        </div>
      </div>
      <div>
        {/* 문의내역 */}
        <div className={myPageStyle.inquiryContainer}>
          <div className={myPageStyle.inquiryItem}>
            <div>문의내역</div>
            <div>상태</div>
          </div>
          <ul className={myPageStyle.inquiryList}>
            {inquiries.map((item) => (
              <li key={item.inquiryId} className={myPageStyle.inquiryItem}>
                <div>{item.title}</div>
                <div>{item.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
