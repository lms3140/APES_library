package com.bookshop.service;

import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.dto.OrderItemDto;
import com.bookshop.dto.ReviewDto;
import com.bookshop.entity.Member;
import com.bookshop.entity.MemberHistory;
import com.bookshop.entity.MemberStatus;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.repository.MemberHistoryRepository;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.OrderDetailRepository;
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
    private final MemberHistoryRepository historyRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ReviewRepository reviewRepository;

    public MemberAdminServiceImpl(MemberRepository memberRepository,
                                  MemberHistoryRepository historyRepository,
                                  PurchaseOrderRepository purchaseOrderRepository,
                                  OrderDetailRepository orderDetailRepository,
                                  ReviewRepository reviewRepository) {
        this.memberRepository = memberRepository;
        this.historyRepository = historyRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.reviewRepository = reviewRepository;
    }

    // ===== 회원 목록 =====
    @Override
    @Transactional(readOnly = true)
    public Page<Member> getMembers(String keyword, String status, Pageable pageable) {
        boolean hasKeyword = keyword != null && !keyword.isBlank();
        boolean hasStatus = status != null && !status.isBlank();

        if (hasKeyword && hasStatus) {
            MemberStatus s = MemberStatus.valueOf(status);
            return memberRepository
                    .findByStatusAndUserIdContainingOrStatusAndNameContainingOrStatusAndEmailContaining(
                            s, keyword, s, keyword, s, keyword, pageable
                    );
        }
        if (hasKeyword) {
            return memberRepository.findByUserIdContainingOrNameContainingOrEmailContaining(
                    keyword, keyword, keyword, pageable
            );
        }
        if (hasStatus) {
            return memberRepository.findByStatus(MemberStatus.valueOf(status), pageable);
        }
        return memberRepository.findAll(pageable);
    }

    // ===== 회원 상세 =====
    @Override
    @Transactional(readOnly = true)
    public Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));
    }

    // ===== 상태 변경 =====
    @Override
    public void changeStatus(Long adminId, Long memberId, String status, String reason) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));

        String prevStatus = member.getStatus().name();
        member.setStatus(MemberStatus.valueOf(status));
        if (member.getStatus() == MemberStatus.BLOCK) member.setBlockReason(reason);

        // 히스토리 저장
        MemberHistory history = new MemberHistory();
        history.setMember(member);
        history.setType("STATUS");
        history.setBeforeValue(prevStatus);
        history.setAfterValue(status);
        history.setReason(reason);
        historyRepository.save(history);
    }

    // ===== 포인트 변경 =====
    @Override
    public void changePoint(Long adminId, Long memberId, int amount, String reason) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));

        int prevPoint = member.getPointBalance();
        member.setPointBalance(prevPoint + amount);

        MemberHistory history = new MemberHistory();
        history.setMember(member);
        history.setType("POINT");
        history.setBeforeValue(String.valueOf(prevPoint));
        history.setAfterValue(String.valueOf(member.getPointBalance()));
        history.setReason(reason);
        historyRepository.save(history);
    }

    // ===== 회원 주문 조회 =====
    @Override
    @Transactional(readOnly = true)
    public List<OrderHistoryDto> getOrders(Long memberId) {
        if (!memberRepository.existsById(memberId))
            throw new EntityNotFoundException("회원이 존재하지 않습니다.");

        List<PurchaseOrder> orders = purchaseOrderRepository
                .findByMemberMemberIdAndDeletedFalseOrderByCreatedAtDesc(memberId);

        return orders.stream().map(order -> {
            List<OrderItemDto> items = orderDetailRepository
                    .findByOrderOrderId(order.getOrderId())
                    .stream().map(OrderItemDto::new).toList();

            return OrderHistoryDto.builder()
                    .orderId(order.getOrderId())
                    .orderStatus(order.getOrderStatus())
                    .originalAmount(order.getOriginalAmount())
                    .paidAt(order.getPaidAt())
                    .items(items)
                    .build();
        }).toList();
    }

    // ===== 회원 리뷰 조회 =====
    @Override
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviews(Long memberId) {
        if (!memberRepository.existsById(memberId))
            throw new EntityNotFoundException("회원이 존재하지 않습니다.");

        return reviewRepository.findByMember_MemberId(memberId)
                .stream()
                .map(review -> ReviewDto.builder()
                        .reviewId(review.getReviewId())
                        .memberId(review.getMember().getMemberId())
                        .userId(review.getMember().getUserId())
                        .bookId(review.getBook().getBookId())
                        .title(review.getBook().getTitle())
                        .rating(review.getRating())
                        .content(review.getContent())
                        .createdAt(review.getCreatedAt().toString())
                        .build())
                .toList();
    }

    // ===== 회원 히스토리 조회 =====
    @Override
    @Transactional(readOnly = true)
    public List<MemberHistory> getHistories(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));
        return historyRepository.findByMemberOrderByCreatedAtDesc(member);
    }
}
