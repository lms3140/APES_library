package com.bookshop.Controller;

import com.bookshop.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/auth/kakao")
public class KakaoAuthController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private RestTemplate restTemplate;

    // 카카오 로그인 후 callback 처리
// 카카오 로그인 후 콜백 처리 (회원 확인 및 JWT 발급)
    @RequestMapping("/callback")
    public ResponseEntity<Map<String, Object>> kakaoCallback(@RequestParam("code") String code) {
        // 카카오에서 제공하는 code로 액세스 토큰을 발급받음
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "faa41cfd2406bc361c3eb40aa4fb7ceb");
        params.add("redirect_uri", "http://localhost:5173/auth/kakao/callback");
        params.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);

        // 액세스 토큰 요청
        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, tokenRequest, Map.class);
        String accessToken = (String) response.getBody().get("access_token");

        // 액세스 토큰으로 카카오 사용자 정보 조회
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> userInfoRequest = new HttpEntity<>(userInfoHeaders);

        // 사용자 정보 조회
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);
        Map<String, Object> userInfo = userInfoResponse.getBody();

        String kakaoId = userInfo.get("id").toString();

        // 카카오 ID로 사용자 존재 여부 확인
        boolean isUserExist = memberService.isUserExist(kakaoId);
        if (!isUserExist) {
            memberService.signupWithKakao(kakaoId);  // 카카오로 신규 가입
        }

        // JWT 생성 및 반환
        String jwt = memberService.generateJwtToken(kakaoId); // 카카오 ID로 JWT 발급

        // JWT를 클라이언트로 반환
        return ResponseEntity.ok(Map.of("access_token", jwt));
    }

}
