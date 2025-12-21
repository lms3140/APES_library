package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoAuthServiceImpl implements KakaoAuthService {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;  // passwordEncoder 주입

    @Override
    public MemberDto loginByKakaoId(String kakaoId) {

        // 1️⃣ 카카오 ID로 회원 조회
        Member member = memberRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> {
                    // 2️⃣ 없으면 자동 회원가입
                    Member newMember = Member.createKakaoMember(kakaoId); // 비밀번호는 평문으로 설정됨

                    // 패스워드 암호화
                    String encryptedPassword = passwordEncoder.encode("kakao_" + kakaoId);  // 암호화
                    newMember.setPwd(encryptedPassword);  // 암호화된 비밀번호 설정

                    return memberRepository.save(newMember);  // 새 회원 저장
                });

        // 3️⃣ JWT 발급
        String jwtToken = jwtService.generateToken(member.getUserId());

        // 4️⃣ DTO로 반환
        return new MemberDto(member, jwtToken, null);
    }
}
