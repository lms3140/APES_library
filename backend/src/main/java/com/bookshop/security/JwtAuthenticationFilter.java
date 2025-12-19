package com.bookshop.security;

import com.bookshop.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * ✅ 카카오 로그인 관련 요청은 JWT 필터 자체를 건너뜀
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.startsWith("/auth/kakao") || uri.startsWith("/admin/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1 토큰 추출 (Bearer → Cookie 순)
        String token = resolveToken(request);

        // 토큰 없으면 인증 시도 안 하고 그대로 통과
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2 ⃣ JWT에서 userId 추출
        String userId = jwtService.extractUsername(token);

        // 3 아직 인증 안 된 경우에만 처리
        if (userId != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            // 4 DB에서 유저 정보 조회
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(userId);

            // 5 토큰 검증
            if (jwtService.validateToken(token)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 6 인증 완료
                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        // 다음 필터 실행
        filterChain.doFilter(request, response);
    }

    /**
     * 토큰 추출 로직
     * 1) Authorization: Bearer xxx
     * 2) HttpOnly Cookie (accessToken)
     */
    private String resolveToken(HttpServletRequest request) {
        // Bearer 헤더 우선
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        // HttpOnly 쿠키
        if (request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if ("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}