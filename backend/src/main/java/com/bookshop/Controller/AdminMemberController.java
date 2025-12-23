package com.bookshop.Controller;

import com.bookshop.entity.Member;
import com.bookshop.service.MemberAdminService;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.bookshop.dto.StatusRequestDto;
import com.bookshop.dto.PointRequestDto;


@RestController
@RequestMapping("/admin/users")
public class AdminMemberController {

    private final MemberAdminService memberAdminService;
    private final MemberService memberService;

    public AdminMemberController(MemberAdminService memberAdminService,
                                 MemberService memberService) {
        this.memberAdminService = memberAdminService;
        this.memberService = memberService;
    }

    // ===== 회원 목록 =====
    @GetMapping
    public Page<Member> list(@RequestParam(required = false) String keyword,
                             @RequestParam(required = false) String status,
                             Pageable pageable) {
        return memberAdminService.getMembers(keyword, status, pageable);
    }

    // ===== 회원 상세 =====
    @GetMapping("/{id}")
    public Member detail(@PathVariable Long id) {
        return memberAdminService.getMember(id);
    }

    // ===== 회원 상태 변경 =====
    @PatchMapping("/{id}/status")
    public void changeStatus(@PathVariable Long id,
                             @RequestBody StatusRequestDto req,
                             HttpServletRequest request) {

        Long adminId = memberService.getCurrentMemberId(request);

        memberAdminService.changeStatus(
                adminId,
                id,
                req.getStatus(),
                req.getReason()
        );
    }

    // ===== 회원 포인트 변경 =====
    @PatchMapping("/{id}/point")
    public void changePoint(@PathVariable Long id,
                            @RequestBody PointRequestDto req,
                            HttpServletRequest request) {

        Long adminId = memberService.getCurrentMemberId(request);

        memberAdminService.changePoint(
                adminId,
                id,
                req.getAmount(),
                req.getReason()
        );
    }
}
