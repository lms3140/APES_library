package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
//@Transactional
public class KakaoAuthServiceImpl implements KakaoAuthService {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    @Value("${kakao.rest-api-key}")
    private String restApiKey;

    // optional: client secret (앱에서 client_secret 사용 설정 했으면 properties에 넣어야 함)
    @Value("${kakao.client-secret:}")
    private String clientSecret;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.admin-key:}")
    private String adminKey;

    private final RestTemplate rest = new RestTemplate();

    @Override
    public MemberDto kakaoLogin(String code) {
        return null;
    }

    @Override
    public boolean kakaoLogout(String token) {
        String url = "https://kapi.kakao.com/v1/user/logout";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Authorization", "Bearer " + token);

        HttpEntity<?> entity = new HttpEntity<>(headers);
        try {
            Map<String, Object> result = rest.postForObject(url, entity, Map.class);
            return result != null && result.get("id") != null;
        } catch (Exception e) {
            // 로그아웃 실패: false 반환
            return false;
        }
    }
}