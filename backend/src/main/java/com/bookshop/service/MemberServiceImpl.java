package com.bookshop.service;

import com.bookshop.dto.MemberDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    public final MemberRepository memberRepository;
    public final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean login(MemberDto memberDto) {
        String encodePwd = memberRepository.findPasswordByUserId(memberDto.getUserId()).orElse(null);
        boolean result = passwordEncoder.matches(memberDto.getPassword(), encodePwd);
        return result;
    }
    @Override
    public boolean signup(MemberDto memberDto) {
        boolean result = false;

//        비밀번호 암호화 하지 않고 DB 입력한 대로 테스트 할 때 주석처리:
        String encodePwd = passwordEncoder.encode(memberDto.getPassword());
        memberDto.setPassword(encodePwd);

//        ---------------------------------------------------------

        Member member = new Member(memberDto);
        Member saveMember = memberRepository.save(member);
        if(saveMember != null) result = true;

        return result;
    }
    @Override
    public boolean idCheck(String userId) {
        boolean result = true;
        Long count = memberRepository.countByUserId(userId);
        if (count == 0) result = false;
        return result;
    }

    @Override
    public Long memberCheck(String userId) {
        Long result = 0L;
        Long check = memberRepository.findByMemberId(userId).orElse(0L);
        if (check != 0L) result = check;

        return result;
    }
}
