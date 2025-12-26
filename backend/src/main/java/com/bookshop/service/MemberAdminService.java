package com.bookshop.service;

import com.bookshop.entity.Member;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberAdminService {

    // ===== 회원 목록 (검색 + 상태 + 페이징) =====
    Page<Member> getMembers(String keyword,
                            String status,
                            Pageable pageable);

    // ===== 회원 상세 =====
    Member getMember(Long memberId);

    // ===== 상태 변경 =====
    void changeStatus(Long adminId,
                      Long memberId,
                      String status,
                      String reason);

    // ===== 포인트 변경 =====
    void changePoint(Long adminId,
                     Long memberId,
                     int amount,
                     String reason);

    // ===== 주문 조회 =====
    List<PurchaseOrder> getOrders(Long memberId);

    // ===== 리뷰 조회 =====
    List<Review> getReviews(Long memberId);
}
