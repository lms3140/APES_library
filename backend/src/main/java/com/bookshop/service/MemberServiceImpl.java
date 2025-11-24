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

            Authentication authenticationRequest =
                    new UsernamePasswordAuthenticationToken(dto.getUserId(), dto.getPwd());
            Authentication authentication = authenticationManager.authenticate(authenticationRequest);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            contextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

            return true;
        } catch (Exception e) {
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
