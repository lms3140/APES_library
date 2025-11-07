import styles from "./QnAForm.module.css";
import { useState } from "react";

export function QnAForm() {
  const [inquiryType, setInquiryType] = useState("");
  const [isContentEnabled, setIsContentEnabled] = useState(false);
  const [content, setContent] = useState("");

  // 문의유형 선택 시
  const handleInquiryChange = (e) => {
    const value = e.target.value;
    setInquiryType(value);
    setIsContentEnabled(!!value);
  };

  // textarea 입력 시
  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setContent(value);
    }
  };

  return (
    <div className={styles.qnaContainer}>
      <h1>1:1 문의 접수</h1>

      <form className={styles.from}>
        {/* 문의유형 */}
        <div className={styles.fieldRow}>
          <label htmlFor="inquiryType" className={styles.label}>
            문의유형 <span className={styles.green}>*</span>
          </label>
          <select
            id="inquiryType"
            className={styles.select}
            value={inquiryType}
            onChange={handleInquiryChange}
            required
          >
            <option value="">문의 유형을 선택해 주세요.</option>
            <option value="주문">주문 관련</option>
            <option value="환불">환불 관련</option>
            <option value="기타">기타 문의</option>
          </select>
        </div>

        {/* 제목 */}
        <div className={styles.fieldRow}>
          <label htmlFor="title" className={styles.label}>
            내용 <span className={styles.green}>*</span>
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            placeholder="제목을 입력해 주세요."
            required
            disabled={!isContentEnabled}
          />
        </div>

        {/* 내용 */}
        <div className={styles.fieldColumn}>
          <label htmlFor="contetn" className={styles.label}></label>
          <textarea
            id="content"
            className={styles.textarea}
            value={content}
            onChange={handleContentChange}
            placeholder="문의 유형을 먼저 선택 후 입력해 주세요."
            maxLength="500"
            disabled={!isContentEnabled}
          ></textarea>

          {/* 글자수 카운트 */}
          <span className={styles.charCount}>{content.length}/500</span>
        </div>

        {/* 연락처 / 이메일 */}
        <div className={styles.contactSection}>
          <p>문의에 대한 답변 등록 시 알려드립니다.</p>
          <div className={styles.fieldRow}>
            <label className={styles.label}>
              연락처 <span className={styles.green}>*</span>
            </label>

            {/* 오른쪽 내용 묶음 */}
            <div className={styles.contactBox}>
              <div className={styles.contactType}>
                <label>
                  <input type="radio" name="contactType" defaultChecked />
                  휴대폰 번호
                </label>
                <label>
                  <input type="radio" name="contactType" />
                  전화번호
                </label>
              </div>

              <input
                type="text"
                placeholder="유저 전화번호"
                className={`${styles.input} ${styles.phoneInput}`}
              />

              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                답변알림 요청 (답변이 등록되면 알림톡으로 알려드립니다.)
              </label>
            </div>
          </div>

          <div className={styles.emailField}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="유저 이메일"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelBtn}>
            취소
          </button>
          <button type="submit" className={styles.submitBtn}>
            문의접수
          </button>
        </div>

        <div className={styles.noticeBox}>
          <h4>문의내용 답변 안내</h4>
          <p>
            ㆍ답변은 마이룸 또는 회원정보에 등록된 이메일로 확인 가능합니다.
            (문의내용에 따라 고객센터 또는 매장에서 연락드릴 수 있습니다.)
          </p>
          <p>
            ㆍ당일 17시 이후 문의건과 공휴일 1:1 문의는 문의 유형과
            이름/연락처/이메일 주소를 남겨 주시면 확인 후 운영시간에 통지해
            드립니다.
          </p>
          <p>
            ㆍ정상근무일 기준이며, 통지예정일이 휴일인 경우 다음 정상 근무일에
            진행 됩니다.
          </p>
          <p>
            주문 취소 및 변경 문의는 답변 시점에 따라 처리가 어려울 수 있습니다.
          </p>
          <p>
            ㆍ설/추석 연휴 기간 동안은 고객센터 휴무로 인해 1:1 문의 답변이 불가
            합니다.
          </p>
          <p>
            설/추석 연후 끝난 이후부터 순차적으로 답변드릴 예정이니 양해
            부탁드립니다.
          </p>
          <p>
            신학기(3월, 9월)에는 문의량이 급증하여 답변이 지연될 수 있습니다.
          </p>
        </div>
      </form>
    </div>
  );
}
