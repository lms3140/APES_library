import { useRef, useState } from "react";
import styles from "../../pages/Search/Search.module.css";
import { TfiReload } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

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

      <form ref={formRef}>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className={styles.filterSmallTitle}>검색조건</span>
              {isSearchOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          {isSearchOpen && (
            <div>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                상품명
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                저자/역자
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                출판사
              </label>
            </div>
          )}
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsStudyOpen(!isStudyOpen)}
            >
              <span className={styles.filterSmallTitle}>학습서필터</span>
              {isStudyOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          {isStudyOpen && (
            <div>
              <p className={styles.subTitle}>학년</p>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 1학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 2학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 3학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 4학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 5학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                초등학교 6학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                예비 중학생
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                고등학교 공통
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                고등학교 1학년
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                고등학교 2학년
              </label>
              <p className={styles.subTitle}>학기</p>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                공통
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                1학기
              </label>
            </div>
          )}
        </div>

        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsBenefitOpen(!isBenefitOpen)}
            >
              <span className={styles.filterSmallTitle}>혜택/조건</span>
              {isBenefitOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          {isBenefitOpen && (
            <div>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                쿠폰
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                이벤트
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                무료배송
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                핫트랙스배송
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                19세상품만보기
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                19세상품제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                POD
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                분철상품
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                판매마감제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                품절판제외
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                패키지
              </label>
              <label className={styles.filterCheckbox}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span className={styles.checkboxCustom}></span>
                개정판
              </label>
            </div>
          )}
        </div>
      </form>
    </aside>
  );
}
