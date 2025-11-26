import styles from "./Checkbox.module.css";

/**
 * 체크박스 버튼 필요시 사용하시면 됩니다.
 * 기본 css는 수정하지 말아주세요.
 * 프롭스 더 필요하실 경우 김민주에게 말해주세요!
 * 사용법 SearchFilter.jsx, SearchItems.jsx, QnAForm.jsx 참고!
 */
export function Checkbox({ checked, onChange, labelStyle, label }) {
  return (
    <label className={labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom}></span>
      {label}
    </label>
  );
}
