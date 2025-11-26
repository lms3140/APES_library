import styles from "./Checkbox.module.css";

/**
 * 재사용 가능한 체크박스 컴포넌트
 * props:
 *  - checked: boolean (체크 여부)
 *  - onChange: () => void (토글 함수)
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
