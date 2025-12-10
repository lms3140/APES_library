package com.bookshop.service;

import com.bookshop.dto.HistoryAddressDto;
import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.dto.OrderItemDto;
import com.bookshop.entity.Member;
import com.bookshop.entity.OrderDetail;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.OrderDetailRepository;
import com.bookshop.repository.PurchaseOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderHistoryServiceImpl implements OrderHistoryService{

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<OrderHistoryDto> getOrderHistoryList() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("유저 못찾음!"));


        List<OrderHistoryDto> result = new ArrayList<>();
        List<PurchaseOrder> purchaseOrders =
                purchaseOrderRepository.findByMemberMemberIdAndDeletedFalseOrderByCreatedAtDesc(member.getMemberId());
        for(PurchaseOrder order:purchaseOrders){
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderOrderId(order.getOrderId());

            List<OrderItemDto> list = orderDetails.stream()
                    .map(OrderItemDto::new)
                    .toList();

            OrderHistoryDto dto = OrderHistoryDto.builder()
                    .orderId(order.getOrderId())
                    .orderStatus(order.getOrderStatus())
                    .originalAmount(order.getOriginalAmount())
                    .paidAt(order.getPaidAt())
                    .address(new HistoryAddressDto(order.getAddress()))
                    .items(list).build();
            result.add(dto);
        }

        return result;
    }

    @Override
    @Transactional
    public void deleteOrderHistory(Long orderId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문을 찾을 수 없습니다."));

        if(!order.getMember().getMemberId().equals(member.getMemberId())) {
            throw  new RuntimeException("본인의 주문만 삭제할 수 있습니다.");
        }

        order.deleted();

    }
}
