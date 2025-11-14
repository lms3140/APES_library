package com.bookshop.repository;

import com.bookshop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // userId로 회원을 조회하는 메서드
    Optional<Member> findByUserId(String userId);
}
