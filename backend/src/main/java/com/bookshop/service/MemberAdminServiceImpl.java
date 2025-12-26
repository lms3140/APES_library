package com.bookshop.service;

import com.bookshop.entity.Member;
import com.bookshop.entity.MemberStatus;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.entity.Review;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.PurchaseOrderRepository;
import com.bookshop.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemberAdminServiceImpl implements MemberAdminService {

    private final MemberRepository memberRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final ReviewRepository reviewRepository;

    public MemberAdminServiceImpl(MemberRepository memberRepository,
                                  PurchaseOrderRepository purchaseOrderRepository,
                                  ReviewRepository reviewRepository) {
        this.memberRepository = memberRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.reviewRepository = reviewRepository;
    }

    // ===== 회원 목록 =====
    @Override
    @Transactional(readOnly = true)
    public Page<Member> getMembers(String keyword,
                                   String status,
                                   Pageable pageable) {

        boolean hasKeyword = keyword != null && !keyword.isBlank();
        boolean hasStatus = status != null && !status.isBlank();

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

        if (hasKeyword) {
            return memberRepository
                    .findByUserIdContainingOrNameContainingOrEmailContaining(
                            keyword, keyword, keyword, pageable
                    );
        }

        if (hasStatus) {
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

    // ===== 주문 조회 =====
    @Override
    @Transactional(readOnly = true)
    public List<PurchaseOrder> getOrders(Long memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new EntityNotFoundException("회원이 존재하지 않습니다.");
        }
        return purchaseOrderRepository.findByMemberMemberIdAndDeletedFalseOrderByCreatedAtDesc(memberId);
    }

    // ===== 리뷰 조회 =====
    @Override
    @Transactional(readOnly = true)
    public List<Review> getReviews(Long memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new EntityNotFoundException("회원이 존재하지 않습니다.");
        }
        return reviewRepository.findByMember_MemberId(memberId);
    }
}
