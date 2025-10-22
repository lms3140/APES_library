import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.noticeWrapper}>
        <ul>
          <li>
            <Link to={"#"}>공지사항</Link>
            <div>
              <Link>2025년 추석 연휴 비빔밥 무료제공 안내</Link>
            </div>
          </li>
          <li>
            <Link to={"#"}>당첨자 발표</Link>
            <div>
              <Link>이벤트 당첨자 발표</Link>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.footerInnerContainer}>
        <section>
          <h1>무슨문고</h1>
          <div>
            <ul className={styles.footerMenu}>
              <li>
                <Link to={"#"}>회사소개</Link>
              </li>
              <li>
                <Link to={"#"}>이용약관</Link>
              </li>
              <li>
                <Link to={"#"}>개인정보처리방침</Link>
              </li>
              <li>
                <Link to={"#"}>청소년보호정책</Link>
              </li>
              <li>
                <Link to={"#"}>대량구매서비스</Link>
              </li>
              <li>
                <Link to={"#"}>협력사여러분</Link>
              </li>
              <li>
                <Link to={"#"}>채용정보</Link>
              </li>
              <li>
                <Link to={"#"}>광고소개</Link>
              </li>
            </ul>
          </div>
          <address className={styles.footerAddress}>
            <ul>
              <li>교보문고</li>
              <li>서울특별시 강남</li>
              <li>대표이사 : 이명석</li>
              <li>사업자 등록번호 : xxx-xx-xxxxx</li>
              <li>대표전화: xxxx-xxxx</li>
              <li>FAX:xxxx-xxx-xxxx</li>
            </ul>
          </address>
          <span>AFEC BOOK CENTRE</span>
        </section>
        <div>sdas</div>
      </div>
    </footer>
  );
}
