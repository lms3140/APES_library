package com.bookshop.service;

import com.bookshop.dto.Member;
import com.bookshop.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean login(Member member) {
        String encodePwd = memberRepository.login(member.getId());
        boolean result = passwordEncoder.matches(member.getPwd(), encodePwd);
        return result;
    }

    @Override
    public int signup(Member member) {
        String encodePwd = passwordEncoder.encode(member.getPwd());
        member.setPwd(encodePwd);
        return memberRepository.save(member);
    }

    @Override
    public boolean idCheck(String id) {
        boolean result = true;
        Long count = memberRepository.findById(id);
        if(count == 0) result = false;
        return result;
    }
}
