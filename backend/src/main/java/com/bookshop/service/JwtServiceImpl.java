package com.bookshop.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

/**
 * JwtServiceImpl
 * ----------------------------------------------------------
 * JWT(JSON Web Token)를 생성하고 검증하는 역할을 담당하는 서비스 클래스.
 *
 * 이 클래스에서 하는 일은 크게 3가지:
 * 1) 사용자 ID를 넣어서 JWT 토큰을 "생성"하기
 * 2) 전달받은 JWT 토큰이 유효한 토큰인지 "검증"하기
 * 3) JWT 안에 저장된 사용자 정보(예: userId) "읽어오기"
 *
 * JWT는 서버가 사용자 인증을 위해 클라이언트에게 발급하는 "서명된 문자열"이라고 보면 됨.
 * 클라이언트는 매 요청마다 이 토큰을 Authorization 헤더에 담아 서버에 전달.
 * 서버는 매번 DB 조회 없이 토큰만으로 사용자 인증 상태를 확인할 수 있음.
 * ----------------------------------------------------------
 */
@Service  // 스프링이 자동으로 Bean으로 등록하여 다른 곳에서 주입(@Autowired)할 수 있게 함
public class JwtServiceImpl implements JwtService {

    /**
     * JWT를 서명하는 데 사용할 비밀키(Secret Key)
     * 이 값은 절대 코드에 하드코딩하면 안 되고,
     * 운영 환경 변수(Environment Variable)로 관리해야 안전함.
     *
     * 예: Linux/macOS → export JWT_SECRET_KEY="very_secure_key_32_bytes_more..."
     */
    private String SECRET_KEY = System.getenv("JWT_SECRET_KEY");

    /**
     * JWT 유효 시간.
     * 지금은 1시간(60분)을 의미함.
     * System.currentTimeMillis()는 현재 시간을 밀리초로 제공.
     */
    private final long EXPIRATION_MS = 1000L * 60 * 60 * 12;

    /**
     * 실제 서명을 위한 Key 객체.
     * SECRET_KEY 문자열을 바이트로 변환하여 Key 객체로 만들어 사용함.
     *
     * key는 한 번 생성하면 계속 재사용하는 것이 안전하고 효율적이기 때문에
     * 생성자에서 초기화함.
     */
    private Key key;

    /**
     * 생성자
     * ----------------------------------------------------------
     * 스프링이 JwtServiceImpl 객체를 생성할 때 자동으로 실행됨.
     * 여기서 SECRET_KEY가 정상적인 값인지 체크하고,
     * JWT 서명에 사용할 Key 객체를 딱 한 번 만들어서 저장함.
     */
    public JwtServiceImpl() {

        // Windows 환경변수: tokenKey
        SECRET_KEY = System.getenv("MY_SECRET_TOKEN");
        System.out.println("SECRET_KEY = " + SECRET_KEY);
        if (SECRET_KEY == null || SECRET_KEY.length() < 32) {
            throw new IllegalStateException(
                    "환경변수 tokenKey가 없거나 32자 미만입니다. 반드시 설정해야 합니다."
            );
        }

        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /**
     * JWT 토큰 생성
     * ----------------------------------------------------------
     * 사용자가 로그인을 성공하면 서버가 userId를 기반으로 JWT를 만들어 반환.
     * 이 토큰을 클라이언트(웹/앱)는 header에 담아 서버로 계속 보냄.
     *
     * @param userId : JWT에 저장할 사용자 ID
     * @return 생성된 JWT 문자열
     */
    @Override
    public String generateToken(String userId) {

        /**
         * JWT 구조
         * -----------------------------------------------
         * Header: 알고리즘 정보 등
         * Payload: 실제 데이터 (여기선 userId)
         * Signature: 위조 방지를 위한 서명
         */

        return Jwts.builder()
                .setSubject(userId)  // Payload: 'sub' claim에 사용자 ID 저장
                .setIssuedAt(new Date())  // 토큰이 언제 생성됐는지 시간 기록
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))  // 만료 시간 설정
                .signWith(key, SignatureAlgorithm.HS256)  // Key + 알고리즘으로 서명 생성
                .compact();  // 최종적으로 JWT 문자열 생성
    }

    /**
     * JWT 토큰 검증
     * ----------------------------------------------------------
     * 유효한 토큰인지 체크함.
     * 서명이 올바른지, 만료되지는 않았는지 등을 모두 확인함.
     *
     * @param token : 클라이언트가 보낸 JWT 토큰
     * @return true → 정상적인 토큰
     *         false → 서명 위조, 만료, 손상 등 문제 발생
     */
    @Override
    public boolean validateToken(String token) {
        try {
            // parseClaims()는 토큰을 분석하면서 자동으로 서명 검증까지 진행함
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // JwtException: 토큰 위조, 만료 등의 문제
            // IllegalArgumentException: 토큰 문자열이 null/비정상 일 때
            return false;
        }
    }

    /**
     * JWT 안에서 userId(sub)를 꺼내오는 메서드
     *
     * @param token JWT 토큰
     * @return userId (sub claim)
     */
    @Override
    public String getUserId(String token) {
        return parseClaims(token).getBody().getSubject();
    }

    /**
     * 사용자 이름(username)을 추출하는 메서드
     * 여기서는 userId = username 이라고 가정해서 동일하게 처리함.
     * 필요하면 payload에 "username" claim을 따로 넣어 커스텀 가능.
     */
    @Override
    public String extractUsername(String token) {
        return getUserId(token);
    }

    /**
     * 공용 Claims 파싱 메서드
     * ----------------------------------------------------------
     * parseClaimsJws()는 다음을 자동으로 해줌:
     * 1) 토큰이 올바른 형식인지 검사
     * 2) 서명이 조작되지 않았는지 확인
     * 3) 만료 시간이 지났는지 체크
     * 4) payload(Claims) 반환
     *
     * @param token JWT 토큰
     * @return Jws<Claims> : JWT Body + Header 정보 모두 포함
     */
    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)  // 서명 검증에 사용할 key 지정
                .build()
                .parseClaimsJws(token);  // 실제 분석 및 검증 진행
    }
}
