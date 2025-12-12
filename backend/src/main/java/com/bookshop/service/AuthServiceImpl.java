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
@Transactional
public class AuthServiceImpl implements AuthService {

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
    public MemberDto kakaoLogin() {
        // 1) 인가코드 -> 액세스 토큰
        String client_id = "4e8b6c9bfc4e9584384acbb4b29fd48f";
        String redirect_uri = "http://localhost:8080/auth/kakao/loginReady";
        String response_type = "code";
        String authUrl = "https://kauth.kakao.com/oauth/authorize?client_id="+client_id
                            +"&redirect_uri="+redirect_uri
                            +"&response_type="+response_type;
        System.out.println("authUrl--------------> "+authUrl);


//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "UzOujjLwY8bDFoLIFUUaXIJnZSa9_B0uAAAAAQoXEG8AAAGbEPT9D8Len3w93lOl");
//        params.add("client_id", restApiKey);
//        params.add("redirect_uri", redirectUri);
//        params.add("code", code);
//        if (clientSecret != null && !clientSecret.isBlank()) {
//            params.add("client_secret", clientSecret);
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);
//
//        Map<String, Object> tokenResponse;
//        try {
//            tokenResponse = rest.postForObject(tokenUrl, tokenRequest, Map.class);
//        } catch (HttpClientErrorException e) {
//            // 401, 400 등 카카오 오류 발생시 원인 로깅 후 예외 전파
//            throw new RuntimeException("카카오 토큰 발급 실패: " + e.getStatusCode() + " " + e.getResponseBodyAsString(), e);
//        }
//
//        if (tokenResponse == null || tokenResponse.get("access_token") == null) {
//            throw new RuntimeException("카카오 토큰 응답이 올바르지 않습니다.");
//        }
//
//        String accessToken = tokenResponse.get("access_token").toString();
//
//        // 2) 사용자 정보 조회
//        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
//        HttpHeaders uHeaders = new HttpHeaders();
//        uHeaders.add("Authorization", "Bearer " + accessToken);
//        HttpEntity<?> userReq = new HttpEntity<>(uHeaders);
//
//        Map<String, Object> userInfo;
//        try {
//            userInfo = rest.postForObject(userInfoUrl, userReq, Map.class);
//        } catch (HttpClientErrorException e) {
//            throw new RuntimeException("카카오 사용자 정보 조회 실패: " + e.getStatusCode() + " " + e.getResponseBodyAsString(), e);
//        }
//
//        if (userInfo == null || userInfo.get("id") == null) {
//            throw new RuntimeException("카카오 사용자 정보가 비어있습니다.");
//        }
//
//        String kakaoId = userInfo.get("id").toString();
//
//        // 3) DB 회원 조회 또는 생성
//        Member member = memberRepository.findByKakaoId(kakaoId)
//                .orElseGet(() -> {
//                    Member newMember = Member.createKakaoMember(kakaoId);
//                    return memberRepository.save(newMember);
//                });
//
//        // 4) 서버 JWT 생성
//        String jwt = jwtService.generateToken(member.getUserId());

        // 5) DTO 반환 (서버 JWT + 카카오 access token)
//        return new MemberDto(member, jwt, accessToken);
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
