package com.bookshop.service;

import com.bookshop.dto.MemberDto;
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
    public boolean login(MemberDto member) {
        boolean result = false;
        return result;
    }
    @Override
    public boolean signup(MemberDto member) {
        boolean result = false;
        return result;
    }
    @Override
    public boolean idCheck(String id) {
        boolean result = false;
        return result;
    }
}
