import { axiosPost } from '../utils/dataFetch.js';

/**
 * 로그인 요청 API
 * @param {string} memberId - 사용자가 입력한 회원 ID
 * @param {string} pwd - 사용자가 입력한 비밀번호
 * @returns {Object} 서버로부터 받은 로그인 결과 (JWT 토큰 등)
 */
export const loginMember = async (memberId, pwd) => {
    // 요청 URL (Spring Boot의 로그인 엔드포인트)
    const url = '/member/login';

    // 서버로 보낼 데이터
    const data = {
        memberId: memberId,
        pwd: pwd,
    };

    // 공통 axiosPost() 유틸을 통해 POST 요청 수행
    const jsonData = await axiosPost(url, data);

    // 서버 응답(JSON 형태)을 그대로 반환
    return jsonData;
};
