package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 카카오 로그인 전용 컨트롤러
 *
 * 역할:
 *  - 프론트에서 전달받은 인가 코드(code)를 받는다
 *  - 실제 카카오 통신은 Service에게 위임한다
 *  - 로그인 결과(MemberDto + JWT)를 프론트에 반환한다
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/kakao")
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    /**
     * ✅ 카카오 로그인 콜백 (프론트 → 백엔드)
     *
     * 프론트에서 전달되는 body 예시:
     * {
     *   "code": "QkM3V1R5..."
     * }
     */
    @PostMapping("/callbackToken")
    public ResponseEntity<MemberDto> kakaoLogin(
            @RequestBody Map<String, String> body
    ) {
        // 1️⃣ 프론트에서 인가 코드 추출
        String code = body.get("code");

        if (code == null || code.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        // 2️⃣ 카카오 로그인 처리 (Service에게 위임)
        MemberDto memberDto = kakaoAuthService.kakaoLogin(code);

        // 3️⃣ 로그인 결과 반환
        return ResponseEntity.ok(memberDto);
    }

    /**
     * (선택) 카카오 로그아웃
     * 👉 access_token을 받아 카카오 서버에 로그아웃 요청
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> kakaoLogout(
            @RequestHeader("Authorization") String authorization
    ) {
        // "Bearer xxx" → 토큰만 분리
        String token = authorization.replace("Bearer ", "");

        boolean result = kakaoAuthService.kakaoLogout(token);

        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
