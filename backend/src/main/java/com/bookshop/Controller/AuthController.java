package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/kakao")
public class AuthController {

    private final AuthService authService;

    /**
     * 카카오 로그인 콜백
     * 예: http://localhost:8080/auth/kakao/callback?code=xxxxx
     */
    @GetMapping("/login")
    public ResponseEntity<?> kakaoCallback() {
//        MemberDto dto = authService.kakaoLogin(code);
        authService.kakaoLogin();
        return null;
//        return ResponseEntity.ok(null);
    }

    /**
     * 카카오 로그아웃
     */
    @PostMapping("/logout")
    public ResponseEntity<?> kakaoLogout(@RequestHeader("Authorization") String accessToken) {

        // accessToken = "Bearer {token}" 형식 → token만 추출
        String token = accessToken.replace("Bearer ", "");

        boolean result = authService.kakaoLogout(token);

        if (result) return ResponseEntity.ok("카카오 로그아웃 완료");
        else return ResponseEntity.status(400).body("카카오 로그아웃 실패");
    }
}
