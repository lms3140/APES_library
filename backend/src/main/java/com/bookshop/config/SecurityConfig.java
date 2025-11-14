package com.bookshop.config;

import com.bookshop.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final MemberService memberService;

    // 생성자 주입
    public SecurityConfig(MemberService memberService) {
        this.memberService = memberService;
    }

    // HttpSecurity 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화 (SPA 환경에서 주로 사용)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // JWT 인증을 사용할 때 세션을 사용하지 않음
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/signup", "/public/**").permitAll()  // 로그인, 회원가입, 공개 API는 인증 없이 접근 가능
                        .requestMatchers("/user/**").hasRole("USER")  // USER 권한이 필요한 API
                        .requestMatchers("/admin/**").hasRole("ADMIN")  // ADMIN 권한이 필요한 API
                        .anyRequest().authenticated()  // 나머지 요청은 인증 필요
                );
        return http.build();
    }

    // DaoAuthenticationProvider: 사용자 인증을 처리하는 제공자
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(memberService);  // MemberService를 UserDetailsService로 설정
        provider.setPasswordEncoder(passwordEncoder());  // 비밀번호 인코더 설정
        return provider;
    }

    // AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // PasswordEncoder (BCryptPasswordEncoder 사용)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // BCryptPasswordEncoder로 비밀번호 암호화
    }

    // CORS 설정 (프론트엔드 서버에서 오는 요청을 허용)
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));  // CORS 허용 URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);  // 쿠키를 사용하려면 필수
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * 사용자의 인증 상태를 Http 세션에 저장하고 로드하는 역할을 담당하는 핵심 컴포넌트
     */
    @Bean
    public HttpSessionSecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }
}

