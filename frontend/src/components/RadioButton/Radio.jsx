import styles from "./Radio.module.css";

/**
 * 라디오 버튼 필요시 사용하시면 됩니다.
 * 기본 css는 수정하지 말아주세요.
 * 프롭스 더 필요하실 경우 김민주에게 말해주세요!
 * 사용법 QnAFrom.jsx 참고!
 */
export function Radio({ name, checked, onChange, label }) {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
      />
      <span className={styles.radioCustom}></span>
      {label}
    </label>
  );
}
