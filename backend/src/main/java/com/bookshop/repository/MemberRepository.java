package com.bookshop.repository;

import com.bookshop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT m.pwd FROM Member m WHERE m.userId = :userId")
    String findPwdByUserId(String userId);
    Long countByUserId(String userId); // 아이디 중복 체크
    Optional<Member> findByUserId(String userId); // 로그인
    default boolean existsByUserId(String userId) {
        return countByUserId(userId) > 0;
    }
}
