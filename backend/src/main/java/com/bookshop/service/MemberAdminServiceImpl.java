package com.bookshop.service;

import com.bookshop.entity.Member;
import com.bookshop.entity.MemberStatus;
import com.bookshop.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberAdminServiceImpl implements MemberAdminService {

    private final MemberRepository memberRepository;

    public MemberAdminServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // ===== 회원 목록 조회 =====
    @Override
    @Transactional(readOnly = true)
    public Page<Member> getMembers(String keyword,
                                   String status,
                                   Pageable pageable) {

        if (keyword != null && !keyword.isBlank()
                && status != null && !status.isBlank()) {

            return memberRepository
                    .findByStatusAndUserIdContainingOrNameContainingOrEmailContaining(
                            MemberStatus.valueOf(status),
                            keyword, keyword, keyword,
                            pageable
                    );
        }

        if (keyword != null && !keyword.isBlank()) {
            return memberRepository
                    .findByUserIdContainingOrNameContainingOrEmailContaining(
                            keyword, keyword, keyword, pageable
                    );
        }

        if (status != null && !status.isBlank()) {
            return memberRepository.findByStatus(
                    MemberStatus.valueOf(status),
                    pageable
            );
        }

        return memberRepository.findAll(pageable);
    }

    // ===== 회원 상세 =====
    @Override
    @Transactional(readOnly = true)
    public Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new EntityNotFoundException("회원이 존재하지 않습니다."));
    }

    // ===== 회원 상태 변경 =====
    @Override
    public void changeStatus(Long adminId,
                             Long memberId,
                             String status,
                             String reason) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new EntityNotFoundException("회원이 존재하지 않습니다."));

        MemberStatus memberStatus = MemberStatus.valueOf(status);
        member.setStatus(memberStatus);

        if (MemberStatus.BLOCK.equals(memberStatus)) {
            member.setBlockReason(reason);
        } else {
            member.setBlockReason(null);
        }

        // ===== 관리자 로그 (정책 확정 전 주석 처리) =====
        /*
        adminAuditLogService.log(
            adminId,
            "CHANGE_MEMBER_STATUS",
            "memberId=" + memberId
        );
        */
    }

    // ===== 회원 포인트 변경 =====
    @Override
    public void changePoint(Long adminId,
                            Long memberId,
                            int amount,
                            String reason) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new EntityNotFoundException("회원이 존재하지 않습니다."));

        member.setPointBalance(
                member.getPointBalance() + amount
        );

        // ===== 관리자 로그 (정책 확정 전 주석 처리) =====
        /*
        adminAuditLogService.log(
            adminId,
            "CHANGE_MEMBER_POINT",
            "memberId=" + memberId
        );
        */
    }
}
