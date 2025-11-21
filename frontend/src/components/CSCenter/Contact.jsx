import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>전화상담서비스 안내도</h1>
        <p>1. 로그인 하시면 배송조회/반품조회는 확인 가능합니다.</p>
        <p>
          2. 밑줄 친 내용의 경우 사이트 내에서 확인 가능한 메뉴이며, 선택 시
          해당 페이지로 이동됩니다.
        </p>
      </div>

      <div className={styles.tableWrap}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 주문배송 및 이용안내</h2>
          <div className={styles.subTable}>
            <p>
              <span>1. </span>
              <Link to="/mypage">주문/배송 조회</Link>
            </p>
            <p>2. 반품조회</p>
            <p>3. 환불 조회</p>
            <p>0. 기타문의 및 상담원 연결</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 도서문의</h2>
          <div className={styles.subTable}>
            <p>1. 도서재고</p>
            <p>2. 도서상담</p>

            <div className={styles.rowGroup}>
              <div className={styles.leftCell}>
                <span>3. 교과서 안내</span>
              </div>
              <div className={styles.rightCell}>
                <p>1. 초, 중, 고 교과서</p>
                <p>2. 방송대 교과서</p>
                <p>0. 기타문의 및 상담원 연결</p>
              </div>
            </div>

            <p>4. 교환/반품 안내</p>
            <p>5. 출판사 전화번호</p>
            <p>0. 기타문의 및 상담원 연결</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 매장 이용안내</h2>

          <div className={styles.storeGrid}>
            <div
              className={`${styles.cell} ${styles.level1Span} ${styles.noLeft}`}
            >
              <span>1. </span>
              <Link to="/store-info/001">매장 영업시간 안내</Link>
            </div>

            <div className={`${styles.cell} ${styles.level2} ${styles.col2}`}>
              1. 서울
            </div>
            <div className={`${styles.cell} ${styles.level3} ${styles.col3}`}>
              <ul className={styles.storeList}>
                <li>01. 광화문점</li>
                <li>02. 강남점</li>
                <li>03. 잠실점</li>
                <li>04. 목동점</li>
                <li>05. 영등포점</li>
                <li>06. 디큐브시티 바로드림 센터</li>
                <li>07. 수유 바로드림 센터</li>
                <li>08. 동대문 바로드림 센터</li>
                <li>09. 은평 바로드림 센터</li>
                <li>10. 청량리 바로드림 센터</li>
                <li>11. 합정점</li>
                <li>12. 가든파이브 바로드림 센터</li>
                <li>13. 천호점</li>
                <li>00. 기타문의 및 상담원 연결</li>
              </ul>
            </div>

            <div
              className={`${styles.cell} ${styles.level2} ${styles.col2}`}
              style={{ gridRow: 2 }}
            >
              2. 수도권
            </div>
            <div
              className={`${styles.cell} ${styles.level3} ${styles.col3}`}
              style={{ gridRow: 2 }}
            >
              <ul className={styles.storeList}>
                <li>01. 분당점</li>
                <li>02. 평촌점</li>
                <li>03. 부천점</li>
                <li>04. 인천점</li>
                <li>05. 일산점</li>
                <li>06. 송도 바로드림센터</li>
                <li>07. 판교 바로드림센터</li>
                <li>08. 광교월드스퀘어센터</li>
                <li>09. 광교점</li>
                <li>00. 기타문의 및 상담원 연결</li>
              </ul>
            </div>

            <div
              className={`${styles.cell} ${styles.level2} ${styles.col2}`}
              style={{ gridRow: 3 }}
            >
              3. 지방
            </div>
            <div
              className={`${styles.cell} ${styles.level3} ${styles.col3}`}
              style={{ gridRow: 3 }}
            >
              <ul className={styles.storeList}>
                <li>01. 대구점</li>
                <li>02. 해운대점</li>
                <li>03. 부산점</li>
                <li>04. 창원점</li>
                <li>05. 천안점</li>
                <li>06. 울산점</li>
                <li>07. 대전점</li>
                <li>08. 전주 바로드림 센터</li>
                <li>09. 센텀시티점</li>
                <li>10. 칠곡 센터</li>
                <li>11. 세종 바로드림 센터</li>
                <li>12. 광주상무 센터</li>
                <li>13. 경성대부경대 센터</li>
                <li>00. 기타문의 및 상담원 연결</li>
              </ul>
            </div>
            <div
              className={`${styles.cell} ${styles.level2} ${styles.col2}`}
              style={{ gridRow: 4 }}
            >
              4. 대학 구내서점
            </div>
            <div
              className={`${styles.cell} ${styles.level3} ${styles.col3}`}
              style={{ gridRow: 4 }}
            >
              <ul className={styles.storeList}>
                <li>01. 이화여대점</li>
                <li>02. 서울대점</li>
                <li>03. 카톨릭대점</li>
                <li>04. 포항공대점</li>
                <li>05. 전북대점</li>
                <li>00. 기타문의 및 상담원 연결</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
