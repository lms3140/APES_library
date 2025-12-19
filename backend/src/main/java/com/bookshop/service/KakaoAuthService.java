package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import org.springframework.http.ResponseEntity;

public interface KakaoAuthService {
    MemberDto kakaoLogin(String code); // code로 카카오 로그인 처리
    // 필요하면 다른 소셜 로그인도 여기 통합

    boolean kakaoLogout(String token);
}