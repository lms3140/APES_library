package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final AuthenticationManager authenticationManager;
    private final HttpSessionSecurityContextRepository contextRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             AuthenticationManager authenticationManager,
                             HttpSessionSecurityContextRepository contextRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.contextRepository = contextRepository;
    }

    @Override
    public boolean login(MemberDto dto, HttpServletRequest request, HttpServletResponse response) {
        try {
            Member member = memberRepository.findByUserId(dto.getUserId()).orElse(null);
            if (member == null) return false;

            // 1. 인증 요청
            Authentication authenticationRequest =
                    new UsernamePasswordAuthenticationToken(dto.getUserId(), dto.getPwd());

            // 2. 인증 처리
            Authentication authenticationResponse = authenticationManager.authenticate(authenticationRequest);
            System.out.println("인증 성공: " + authenticationResponse.getPrincipal());
            System.out.println("권한: " + authenticationResponse.getAuthorities());

            // 3. SecurityContext 명시적으로 생성 및 저장
            var context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationResponse);
            SecurityContextHolder.setContext(context);
            contextRepository.saveContext(context, request, response);

            return true;
        } catch (Exception e) {
            System.out.println("로그인 실패: " + e.getMessage());
            return false;
        }
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();

        Cookie jsession = new Cookie("JSESSIONID", null);
        jsession.setPath("/");
        jsession.setMaxAge(0);
        jsession.setHttpOnly(true);
        response.addCookie(jsession);
    }

    @Override
    public boolean signup(MemberDto dto) {
        if (idCheck(dto.getUserId())) return false;

        dto.setPwd(passwordEncoder.encode(dto.getPwd()));
        Member saved = memberRepository.save(new Member(dto));
        return saved != null;
    }

    @Override
    public boolean idCheck(String userId) {
        return memberRepository.countByUserId(userId) > 0;
    }

    @Override
    public Long memberCheck(String userId) {
        return memberRepository.findByUserId(userId)
                .map(Member::getMemberId)
                .orElse(0L);
    }
}
