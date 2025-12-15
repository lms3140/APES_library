package com.bookshop.service;

import com.bookshop.dto.*;
import com.bookshop.entity.Address;
import com.bookshop.entity.PurchaseOrder;
import com.bookshop.repository.OrderDetailRepository;
import com.bookshop.repository.PurchaseOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService{
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderHistoryDto> getAllOrders() {
        List<PurchaseOrder> orders =
                purchaseOrderRepository.findAllByDeletedFalseOrderByCreatedAtDesc();
        return orders.stream().map(order -> {
            List<OrderItemDto> items = orderDetailRepository
                    .findByOrderOrderId(order.getOrderId())
                    .stream()
                    .map(OrderItemDto::new)
                    .toList();

            return OrderHistoryDto.builder()
                    .orderId(order.getOrderId())
                    .orderStatus(order.getOrderStatus())
                    .originalAmount(order.getOriginalAmount())
                    .paidAt(order.getPaidAt())
                    .address(new HistoryAddressDto(order.getAddress()))
                    .items(items)
                    .build();
        }).toList();
    }

    @Override
    public OrderDetailDto getOrderDetail(Long orderId) {
        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<OrderItemDto> items = orderDetailRepository
                .findByOrderOrderId(orderId)
                .stream()
                .map(OrderItemDto::new)
                .toList();

        OrderDetailDto dto = new OrderDetailDto();
        dto.setOrderId(order.getOrderId());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setItems(items);
        dto.setOriginalAmount(order.getOriginalAmount());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setEarnedPoint(order.getEarnedPoint());

        Address address = order.getAddress();
        if (address != null) {
            AddressDto addressDto = new AddressDto(address);
            dto.setAddress(addressDto);
        }

        return dto;
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {
        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        switch (status.toUpperCase()) {
            case "READY" -> order.setOrderStatus("READY");
            case "PAID" -> order.approve();
            case "CANCEL" -> order.cancel();
            case "FAIL" -> order.fail();
            case "ERROR" -> order.error();
            default -> throw new IllegalArgumentException("Invalid order status");
        }
    }
}
