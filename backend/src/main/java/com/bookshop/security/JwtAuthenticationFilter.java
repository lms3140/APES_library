package com.bookshop.security;

import com.bookshop.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1) Authorization 헤더 가져오기
        String authHeader = request.getHeader("Authorization");

        // 없거나 Bearer 로 시작하지 않으면 다음 필터로 넘김
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2) 토큰 추출
        String token = authHeader.substring(7);

        // 3) JWT에서 userId 추출
        String userId = jwtService.extractUsername(token);

        // 4) SecurityContext에 인증 정보가 없을 경우에만 처리
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 5) DB에서 유저 정보 조회
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

            // 6) 토큰이 유효하면 Authentication 생성 후 컨텍스트에 저장
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

                // ★ request를 "로그인된 사용자"로 지정
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 다음 필터 실행
        filterChain.doFilter(request, response);
    }
}