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
    Long countByUserId(String userId);

    Optional<Member> findByUserId(String userId);

    Optional<Member> findByKakaoId(String kakaoId);

    default boolean existsByUserId(String userId) {
        return countByUserId(userId) > 0;
    }

    // ===== 관리자용 기능 =====

    // 전체 회원
    Page<Member> findAll(Pageable pageable);

    // 상태별
    Page<Member> findByStatus(MemberStatus status, Pageable pageable);

    // 키워드 검색
    Page<Member> findByUserIdContainingOrNameContainingOrEmailContaining(
            String userId,
            String name,
            String email,
            Pageable pageable
    );

    // 상태 + 키워드 검색
    Page<Member>
    findByStatusAndUserIdContainingOrStatusAndNameContainingOrStatusAndEmailContaining(
            MemberStatus status1, String userId,
            MemberStatus status2, String name,
            MemberStatus status3, String email,
            Pageable pageable
    );
}
