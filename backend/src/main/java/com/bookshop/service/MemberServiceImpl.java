package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             JwtService jwtService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ===== 로그인 (JWT 발급) =====
    @Override
    public String login(MemberDto dto, HttpServletRequest request, HttpServletResponse response) {
        Optional<Member> memberOpt = memberRepository.findByUserId(dto.getUserId());
        if (memberOpt.isEmpty()) return null;

        Member member = memberOpt.get();
        if (!passwordEncoder.matches(dto.getPwd(), member.getPwd())) return null;

        // JWT 생성
        String token = jwtService.generateToken(member.getUserId());

        // JWT를 Response Header에 넣기
        response.setHeader("Authorization", "Bearer " + token);
        return token;
    }

    // ===== 로그인 (JWT 발급) =====
    @Override
    public String adminLogin(MemberDto dto, HttpServletResponse response) {
        Optional<Member> memberOpt = memberRepository.findByUserId(dto.getUserId());
        if (memberOpt.isEmpty()) return null;
        Member member = memberOpt.get();
        if(!member.getRole().equals("ADMIN")){
            return null;
        }
        if (!passwordEncoder.matches(dto.getPwd(), member.getPwd())) return null;

        // JWT 생성
        String token = jwtService.generateToken(member.getUserId());

        // JWT를 Response Header에 넣기
        response.setHeader("Authorization", "Bearer " + token);
        return token;
    }

    // ===== JWT 기반 회원 확인 =====
    @Override
    public Long getCurrentMemberId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;

        String token = authHeader.substring(7);
        if (!jwtService.validateToken(token)) return null;

        String userId = jwtService.getUserId(token);
        return memberRepository.findByUserId(userId)
                .map(Member::getMemberId)
                .orElse(null);
    }

    // ===== 로그아웃 =====
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // JWT는 서버에서 상태를 관리하지 않으므로, 클라이언트에서 삭제하면 로그아웃 처리됨
        // 서버에서는 특별히 처리할 필요 없음
    }

    // ===== 회원가입 =====
    @Override
    public boolean signup(MemberDto dto) {
        if (idCheck(dto.getUserId())) return false;

        Member member = new Member(dto);
        member.setPwd(passwordEncoder.encode(dto.getPwd()));

        memberRepository.save(member);
        return true;
    }

    // ===== 아이디 중복 체크 =====
    @Override
    public boolean idCheck(String userId) {
        return memberRepository.existsByUserId(userId);
    }

    @Override
    public Long memberCheck(String userId) {
        return memberRepository.findByUserId(userId)
                .map(Member::getMemberId)
                .orElse(0L);
    }

    @Override
    public MemberDto getMemberInfo(String userId) {
        return memberRepository.findByUserId(userId)
                .map(MemberDto::new)
                .orElse(null);
    }

    // 회원 정보 수정
    public boolean updateMember(String userId, MemberDto updateReq) {
        Optional<Member> memberOpt = memberRepository.findByUserId(userId);
        if (memberOpt.isEmpty()) return false;

        Member member = memberOpt.get();

        if(!passwordEncoder.matches(updateReq.getCurrentPwd(), member.getPwd())) {
            return false;
        }

        if (updateReq.getPwd() != null && !updateReq.getPwd().isBlank()) {
            if(updateReq.getPwdCheck() == null || !updateReq.getPwd().equals(updateReq.getPwdCheck())) {
                return false;
            }
            member.setPwd(passwordEncoder.encode(updateReq.getPwd()));
        }

        if (updateReq.getEmail() != null) {
            member.setEmail(updateReq.getEmail());
        }
        if (updateReq.getPhone() != null) {
            member.setPhone(updateReq.getPhone());
        }

        return true;
    }
}
