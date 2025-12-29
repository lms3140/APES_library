package com.bookshop.repository;

import com.bookshop.entity.Member;
import com.bookshop.entity.MemberHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberHistoryRepository extends JpaRepository<MemberHistory, Long> {
    List<MemberHistory> findByMemberOrderByCreatedAtDesc(Member member);
}
