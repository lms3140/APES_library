package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface MemberService {
     // ===== 일반 로그인 (JWT 발급) =====
    String login(MemberDto dto,
                 HttpServletRequest request,
                 HttpServletResponse response);
     // ===== 관리자 로그인 (role = ADMIN) =====
    String adminLogin(MemberDto dto,
                      HttpServletResponse response);
     // ===== JWT 기반 현재 로그인 회원 ID 조회 =====
    Long getCurrentMemberId(HttpServletRequest request);
     // ===== 로그아웃 ===== (JWT 방식이므로 서버 처리 없음)
    void logout(HttpServletRequest request,
                HttpServletResponse response);
     // ===== 회원가입 =====
    boolean signup(MemberDto dto);
     // ===== 아이디 중복 체크 =====
    boolean idCheck(String userId);
     // ===== userId → memberId 조회 =====
    Long memberCheck(String userId);
     // ===== 회원 정보 조회 =====
    MemberDto getMemberInfo(String userId);
     // ===== 회원 정보 수정 =====
    boolean updateMember(String userId, MemberDto updateReq);
}
