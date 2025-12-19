package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/kakao")
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    /**
     * 프론트에서 kakaoId를 전달받아
     * → 회원 조회 / 가입
     * → JWT 발급
     */
    @PostMapping("/login")
    public MemberDto kakaoLogin(@RequestBody MemberDto dto) {
        System.out.println("🔥 kakaoId = " + dto.getKakaoId());
        MemberDto result = kakaoAuthService.loginByKakaoId(dto.getKakaoId());
        System.out.println("JWT = " + result.getJwtToken());
        return result;
    }
}
