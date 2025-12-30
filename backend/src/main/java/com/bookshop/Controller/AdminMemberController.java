package com.bookshop.Controller;

import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.dto.PointRequestDto;
import com.bookshop.dto.StatusRequestDto;
import com.bookshop.entity.Member;
import com.bookshop.entity.MemberHistory;
import com.bookshop.dto.ReviewDto;
import com.bookshop.service.MemberAdminService;
import com.bookshop.service.MemberService;
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

    @GetMapping
    public ResponseEntity<Page<Member>> list(@RequestParam(required = false) String keyword,
                                             @RequestParam(required = false) String status,
                                             Pageable pageable) {
        return ResponseEntity.ok(memberAdminService.getMembers(keyword, status, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> detail(@PathVariable Long id) {
        return ResponseEntity.ok(memberAdminService.getMember(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(@PathVariable Long id,
                                             @RequestBody StatusRequestDto req,
                                             HttpServletRequest request) {
        Long adminId = memberService.getCurrentMemberId(request);
        memberAdminService.changeStatus(adminId, id, req.getStatus(), req.getReason());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/point")
    public ResponseEntity<Void> changePoint(@PathVariable Long id,
                                            @RequestBody PointRequestDto req,
                                            HttpServletRequest request) {
        Long adminId = memberService.getCurrentMemberId(request);
        memberAdminService.changePoint(adminId, id, req.getAmount(), req.getReason());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<List<OrderHistoryDto>> getMemberOrders(@PathVariable Long id) {
        return ResponseEntity.ok(memberAdminService.getOrders(id));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long id) {
        return ResponseEntity.ok(memberAdminService.getReviews(id));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<MemberHistory>> getHistory(@PathVariable Long id) {
        return ResponseEntity.ok(memberAdminService.getHistories(id));
    }
}