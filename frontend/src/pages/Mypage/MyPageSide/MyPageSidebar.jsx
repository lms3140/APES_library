import { Link } from "react-router-dom";
import myPageSideStyle from "./MyPageSidebar.module.css";
import { useState } from "react";
const fakeUserInfo = {
  name: "김곰돌군",
};

export function MyPageSidebar() {
  const [point, _] = useState(1120);
  return (
    <div className={myPageSideStyle.sideBar}>
      <div className={myPageSideStyle.userInfo}>
        <div>{fakeUserInfo.name}</div>
        <div>포인트 : {point}</div>
      </div>
      <ul className={myPageSideStyle.menuList}>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="/mypage/orders">구매목록</Link>
        </li>
        <li>
          <Link to="/mypage/wishlist">찜목록</Link>
        </li>
        <li>
          <Link to="/mypage/profile">회원정보수정</Link>
        </li>
        <li>
          <Link to="/mypage/points">포인트</Link>
        </li>
        <li>
          <Link to="/mypage/reviews">리뷰</Link>
        </li>
        <li>
          <Link to="/mypage/addresses">주소록</Link>
        </li>
        <li>
          <Link to="/mypage/inquiries">1:1 문의내역</Link>
        </li>
      </ul>
    </div>
  );
}
