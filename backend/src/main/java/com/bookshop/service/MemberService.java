package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface MemberService {
    String login(MemberDto dto, HttpServletRequest request, HttpServletResponse response);
    void logout(HttpServletRequest request, HttpServletResponse response);
    boolean signup(MemberDto dto);
    boolean idCheck(String userId);
    Long memberCheck(String userId);
    // ===== 로그인 (JWT 발급) =====
    String adminLogin(MemberDto dto, HttpServletResponse response);
    Long getCurrentMemberId(HttpServletRequest request);
    MemberDto getMemberInfo(String userId);
    boolean updateMember(String userId, MemberDto updateReq);

//    boolean isUserExist(String kakaoId);  // 카카오 ID로 유저 존재 여부 확인
//    void signupWithKakao(String kakaoId); // 카카오로 회원 가입
//    String generateJwtToken(String kakaoId); // 카카오 ID로 JWT 생성
}
