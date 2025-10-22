package com.bookshop.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
//@Transactional  //: DB가 auto-commit 모드이면 생략가능
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
//        System.out.println(encodePwd);
        boolean result = passwordEncoder.matches(member.getPwd(), encodePwd);
        return result;
    }

    @Override
    public int signup(Member member){
        //패스워드 인코딩
        String encodePwd = passwordEncoder.encode(member.getPwd());  //UUID 타입으로 생성됨
        member.setPwd(encodePwd);
//        System.out.println("encodePwd ==>> " + encodePwd);
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
