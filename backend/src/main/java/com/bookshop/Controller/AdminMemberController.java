package com.bookshop.Controller;

import com.bookshop.entity.Member;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.entity.Review;
import com.bookshop.service.MemberAdminService;
import com.bookshop.service.MemberService;
import com.bookshop.dto.StatusRequestDto;
import com.bookshop.dto.PointRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class AdminMemberController {

    private final MemberAdminService memberAdminService;
    private final MemberService memberService;

    // ===== 회원 목록 =====
    @GetMapping
    public ResponseEntity<Page<Member>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            Pageable pageable
    ) {
        Page<Member> members =
                memberAdminService.getMembers(keyword, status, pageable);
        return ResponseEntity.ok(members);
    }

    // ===== 회원 상세 =====
    @GetMapping("/{id}")
    public ResponseEntity<Member> detail(@PathVariable Long id) {
        Member member = memberAdminService.getMember(id);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    // ===== 회원 상태 변경 =====
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(
            @PathVariable Long id,
            @RequestBody StatusRequestDto req,
            HttpServletRequest request
    ) {
        Long adminId = memberService.getCurrentMemberId(request);
        memberAdminService.changeStatus(adminId, id, req.getStatus(), req.getReason());
        return ResponseEntity.ok().build();
    }

    // ===== 회원 포인트 변경 =====
    @PatchMapping("/{id}/point")
    public ResponseEntity<Void> changePoint(
            @PathVariable Long id,
            @RequestBody PointRequestDto req,
            HttpServletRequest request
    ) {
        Long adminId = memberService.getCurrentMemberId(request);
        memberAdminService.changePoint(adminId, id, req.getAmount(), req.getReason());
        return ResponseEntity.ok().build();
    }

    // ===== 회원 주문 조회 =====
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<PurchaseOrder>> getOrders(@PathVariable Long id) {
        List<PurchaseOrder> orders = memberAdminService.getOrders(id);
        return ResponseEntity.ok(orders);
    }

    // ===== 회원 리뷰 조회 =====
    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {
        List<Review> reviews = memberAdminService.getReviews(id);
        return ResponseEntity.ok(reviews);
    }
}
