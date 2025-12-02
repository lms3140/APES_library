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
  editMode,
  onToggleEdit,
}) {
  //눈 아이콘 :: 비밀번호입력창
  const isPasswordRow = buttonIcon !== undefined;
  //변경 버튼 :: 이메일, 전화번호 -> 토글 시 input 활성화
  const isEditableRow = buttonText !== undefined;

  let showInput = false;

  if (isPasswordRow) {
    //비밀번호는 항상 input
    showInput = true;
  } else if (isEditableRow) {
    //이메일/전화번호는 editMode일 때만 input
    showInput = editMode;
  } else {
    //나머지는 항상 텍스트
    showInput = false;
  }

  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>

      <div className={styles.valueWrapper}>
        {showInput ? (
          <div className={styles.inputBox}>
            <input
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
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

      {buttonText && (
        <button className={styles.editBtn} onClick={onToggleEdit}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
