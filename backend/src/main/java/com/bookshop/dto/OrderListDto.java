package com.bookshop.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderListDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private String orderStatus;
    private int totalAmount;
    private List<OrderItemDto> items;

    public OrderListDto() {}
    public OrderListDto(Long orderId, LocalDateTime orderDate, String orderStatus, int totalAmount, List<OrderItemDto> items) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
        this.items = items;
    }
}
