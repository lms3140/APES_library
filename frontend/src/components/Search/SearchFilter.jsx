import { useRef, useState } from "react";
import styles from "../../pages/Search/Search.module.css";
import { TfiReload } from "react-icons/tfi";

export function SearchFilter() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isStudyOpen, setIsStudyOpen] = useState(true);
  const [isBenefitOpen, setIsBenefitOpen] = useState(true);

  const formRef = useRef(null);

  const resetAll = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsSearchOpen(true);
    setIsStudyOpen(true);
    setIsBenefitOpen(true);
  };

  return (
    <aside className={styles.filterArea}>
      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <p className={styles.filterTitle}>필터</p>
          <button type="button" onClick={resetAll}>
            <TfiReload /> 초기화
          </button>
        </div>
      </div>

      <div className={styles.filterCategory}>
        <button>교보문고</button>
        <button>eBook</button>
        <button>sam</button>
        <button>핫트랙스</button>
        <button>리뷰/책소개</button>
        <button>CASTing</button>
      </div>

      <form ref={formRef}>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <p className={styles.filterSmallTitle}>검색조건</p>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? "-" : "+"}
            </button>
          </div>
          {isSearchOpen && (
            <div>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                상품명
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                저자/역자
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                출판사
              </label>
            </div>
          )}
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <p className={styles.filterSmallTitle}>학습서필터</p>
            <button type="button" onClick={() => setIsStudyOpen(!isStudyOpen)}>
              {isStudyOpen ? "-" : "+"}
            </button>
          </div>
          {isStudyOpen && (
            <div>
              <p>학년</p>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 1학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 2학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 3학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 4학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 5학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                초등학교 6학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                예비 중학생
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                고등학교 공통
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                고등학교 1학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                고등학교 2학년
              </label>
              <p>학기</p>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                공통
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                1학기
              </label>
            </div>
          )}
        </div>

        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <p className={styles.filterSmallTitle}>혜택/조건</p>
            <button
              type="button"
              onClick={() => setIsBenefitOpen(!isBenefitOpen)}
            >
              {isBenefitOpen ? "-" : "+"}
            </button>
          </div>
          {isBenefitOpen && (
            <div>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                쿠폰
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                이벤트
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                무료배송
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                핫트랙스배송
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                19세상품만보기
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                19세상품제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                POD
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                분철상품
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                판매마감제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                품절판제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                패키지
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" />
                개정판
              </label>
            </div>
          )}
        </div>
      </form>
    </aside>
  );
}
