package com.bookshop.service;

import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final MemberRepository memberRepository;

    // 생성자 주입
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 사용자 정보 조회 및 반환
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Member 엔티티에서 사용자 정보 조회
        Member member = memberRepository.findByUserId(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // UserDetails 객체 반환 (Spring Security에서 사용하는 객체)
        return User.builder()
                .username(member.getUserId()) // 사용자 아이디
                .password(member.getPassword()) // 암호화된 비밀번호
                .roles(member.getRole())  // 사용자의 역할
                .build();
    }
}
