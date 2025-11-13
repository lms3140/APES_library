package com.bookshop.repository;

import com.bookshop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    //1. 회원 조회
    @Query("""
            select m from Member m where m.userId = :userId
            """)
    Optional<Member> findByUserId(@Param("userId") String userId);

    //1-1. member id 조회
    @Query("""
            select m.memberId from Member m where m.userId = :userId
            """)
    Optional<Long> findByMemberId(@Param("userId") String userId);

    //2. 비밀번호 가져오기
    @Query("""
        SELECT m.password FROM Member m WHERE m.userId = :userId
        """)
    Optional<String> findPasswordByUserId(@Param("userId") String userId);

    //3. 회원 아이디 중복 확인
    Long countByUserId(String userId);

}
