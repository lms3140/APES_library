import { Link } from "react-router-dom";
import myPageStyle from "./MyPageHome.module.css";

const fakeData = {
  imageUrl:
    "https://image.aladin.co.kr/product/37609/38/cover200/k842032742_1.jpg",
  title: "픽미업 1",
};
const fakeInquiryData = {
  title: "책이 구매가안대여",
  status: "대기중",
};

export function MyPageHome() {
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
            <li className={myPageStyle.inquiryItem}>
              <div>{fakeInquiryData.title}</div>
              <div>{fakeInquiryData.status}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
