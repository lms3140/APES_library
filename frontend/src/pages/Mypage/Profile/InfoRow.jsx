import styles from "./InfoRow.module.css";
import { BsEyeSlash } from "react-icons/bs";

export function InfoRow({
  label,
  value,
  buttonText,
  type = "text",
  placeholder,
  onChange,
  buttonIcon,
  onButtonClick,
  errorText,
  infoText,
}) {
  const isInput = value === undefined || value === null;
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>

      <div className={styles.valueWrapper}>
        {isInput ? (
          <div className={styles.inputBox}>
            <input
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              className={styles.input}
            />
            {buttonIcon && (
              <button className={styles.eyeBtn} onClick={onButtonClick}>
                <BsEyeSlash />
              </button>
            )}
          </div>
        ) : (
          <span className={styles.valueText}>{value}</span>
        )}
        {infoText && <p className={styles.info}>{infoText}</p>}
        {errorText && <p className={styles.error}>{errorText}</p>}
      </div>

      {buttonText && <button className={styles.editBtn}>{buttonText}</button>}
    </div>
  );
}
