// export function QnAForm() {
//   return (
//     <div>
//       <h1>1:1 문의 접수</h1>

//       <form>
//         <div>
//           <label htmlFor="inquiryType">문의유형 *</label>
//           <select id="inquiryType" name="inquiryType" required>
//             <option value="">문의 유형을 선택해 주세요.</option>
//             <option value="주문">주문 관련</option>
//             <option value="환불">환불 관련</option>
//             <option value="기타">기타 문의</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="title">내용 *</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             placeholder="제목을 입력해 주세요."
//             required
//           />
//           <div>
//             <textarea
//               id="content"
//               name="content"
//               rows="8"
//               maxLength="500"
//               placeholder="문의 유형을 먼저 선택 후 입력해 주세요."
//             ></textarea>
//             <div></div>

//             <span>0/500</span>
//           </div>
//         </div>

//         <div>
//           <label>사진첨부 0/3</label>
//           <p>빠른 답변을 위해 사진을 첨부해 주세요.</p>
//           <div>
//             <button type="button">+</button>
//             <p>* JPG, PNG, GIF 파일만 최대 3장 업로드 가능합니다.</p>
//           </div>
//         </div>

//         <div>
//           <p>문의에 대한 답변 등록 시 알려드립니다.</p>

//           <div>
//             <label>연락처 *</label>
//             <div>
//               <label>
//                 <input type="radio" name="contactType" defaultChecked />
//                 휴대폰 번호
//               </label>
//               <label>
//                 <input type="radio" name="contactType" />
//                 전화번호
//               </label>
//             </div>
//             <input type="text" placeholder="유저전화번호" />
//             <div>
//               <label>
//                 <input type="checkbox" defaultChecked />
//                 답변알림 요청 (답변이 등록되면 알림톡으로 알려드립니다.)
//               </label>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="email">이메일</label>
//             <input type="email" id="email" placeholder="유저이메일" />
//           </div>
//         </div>

//         <div>
//           <button type="button">취소</button>
//           <button type="submit">문의접수</button>
//         </div>
//       </form>
//     </div>
//   );
// }

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
    <div>
      <h1>1:1 문의 접수</h1>

      <form>
        {/* 문의유형 */}
        <div>
          <label htmlFor="inquiryType">문의유형 *</label>
          <select
            id="inquiryType"
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
        <div>
          <label htmlFor="title">내용 *</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해 주세요."
            required
            disabled={!isContentEnabled}
          />
        </div>

        {/* 내용 */}
        <div style={{ position: "relative" }}>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="문의 유형을 먼저 선택 후 입력해 주세요."
            maxLength="500"
            disabled={!isContentEnabled}
            style={{
              resize: "none",
              width: "100%",
              height: "200px",
              padding: "10px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          ></textarea>

          {/* 글자수 카운트 */}
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "10px",
              fontSize: "12px",
              color: content.length >= 500 ? "red" : "#777",
            }}
          >
            {content.length}/500
          </div>
        </div>

        {/* 연락처 / 이메일 */}
        <div>
          <p>문의에 대한 답변 등록 시 알려드립니다.</p>
          <div>
            <label>연락처 *</label>
            <div>
              <label>
                <input type="radio" name="contactType" defaultChecked />
                휴대폰 번호
              </label>
              <label>
                <input type="radio" name="contactType" />
                전화번호
              </label>
            </div>
            <input type="text" placeholder="유저 전화번호" />
            <div>
              <label>
                <input type="checkbox" defaultChecked />
                답변알림 요청 (답변이 등록되면 알림톡으로 알려드립니다.)
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="유저 이메일" />
          </div>
        </div>

        {/* 버튼 */}
        <div>
          <button type="button">취소</button>
          <button type="submit">문의접수</button>
        </div>
      </form>
    </div>
  );
}
