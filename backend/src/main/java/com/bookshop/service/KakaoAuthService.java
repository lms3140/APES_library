package com.bookshop.service;

import com.bookshop.dto.MemberDto;

public interface KakaoAuthService {
    MemberDto loginByKakaoId(String kakaoId);
}
