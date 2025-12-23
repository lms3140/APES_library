package com.bookshop.service;

import com.bookshop.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberAdminService {

    // ===== 회원 목록 조회 (검색 + 상태 필터 + 페이지네이션) =====
    Page<Member> getMembers(String keyword,
                            String status,
                            Pageable pageable);

    // ===== 회원 상세 조회 =====
    Member getMember(Long memberId);

    // ===== 회원 상태 변경 (ACTIVE / BLOCK / WITHDRAW) =====
    void changeStatus(Long adminId,
                      Long memberId,
                      String status,
                      String reason);

    // ===== 회원 포인트 변경 (증감) =====
    void changePoint(Long adminId,
                     Long memberId,
                     int amount,
                     String reason);
}
