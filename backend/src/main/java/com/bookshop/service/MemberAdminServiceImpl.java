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

    // ===== 회원 목록 =====
    @Override
    @Transactional(readOnly = true)
    public Page<Member> getMembers(String keyword,
                                   String status,
                                   Pageable pageable) {

        boolean hasKeyword = keyword != null && !keyword.isBlank();
        boolean hasStatus = status != null && !status.isBlank();

        // 상태 + 키워드
        if (hasKeyword && hasStatus) {
            MemberStatus s = MemberStatus.valueOf(status);
            return memberRepository
                    .findByStatusAndUserIdContainingOrStatusAndNameContainingOrStatusAndEmailContaining(
                            s, keyword,
                            s, keyword,
                            s, keyword,
                            pageable
                    );
        }

        // 키워드만
        if (hasKeyword) {
            return memberRepository
                    .findByUserIdContainingOrNameContainingOrEmailContaining(
                            keyword, keyword, keyword, pageable
                    );
        }

        // 상태만
        if (hasStatus) {
            return memberRepository.findByStatus(
                    MemberStatus.valueOf(status),
                    pageable
            );
        }

        // 전체
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

    // ===== 상태 변경 =====
    @Override
    public void changeStatus(Long adminId,
                             Long memberId,
                             String status,
                             String reason) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new EntityNotFoundException("회원이 존재하지 않습니다."));

        MemberStatus newStatus = MemberStatus.valueOf(status);
        member.setStatus(newStatus);

        if (newStatus == MemberStatus.BLOCK) {
            member.setBlockReason(reason);
        } else {
            member.setBlockReason(null);
        }
    }

    // ===== 포인트 변경 =====
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
    }
}
