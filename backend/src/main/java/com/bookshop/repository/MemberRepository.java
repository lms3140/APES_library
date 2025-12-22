package com.bookshop.repository;

import com.bookshop.entity.Member;
import com.bookshop.entity.MemberStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // ===== 기존 기능 =====
    // 아이디 중복 체크
    Long countByUserId(String userId);

    // 로그인
    Optional<Member> findByUserId(String userId);

    // 카카오 로그인
    Optional<Member> findByKakaoId(String kakaoId);

    default boolean existsByUserId(String userId) {
        return countByUserId(userId) > 0;
    }

    boolean existsByKakaoId(String kakaoId);

    // ===== 관리자용 기능 =====
     // 회원 전체 목록 (상태 필터)
    Page<Member> findByStatus(MemberStatus status, Pageable pageable);

     // 키워드 검색 (userId / name / email)
    Page<Member> findByUserIdContainingOrNameContainingOrEmailContaining(
            String userId,
            String name,
            String email,
            Pageable pageable
    );

     // 키워드 + 상태 필터
    Page<Member> findByStatusAndUserIdContainingOrNameContainingOrEmailContaining(
            MemberStatus status,
            String userId,
            String name,
            String email,
            Pageable pageable
    );

}
