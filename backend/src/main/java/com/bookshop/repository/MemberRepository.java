package com.bookshop.repository;

import com.bookshop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Long countByUserId(String userId); // 아이디 중복 체크
    Optional<Member> findByUserId(String userId); // 로그인
    Optional<Member> findByKakaoId(String kakaoId);
    default boolean existsByUserId(String userId) {
        return countByUserId(userId) > 0;
    }

    boolean existsByKakaoId(String kakaoId);
}
