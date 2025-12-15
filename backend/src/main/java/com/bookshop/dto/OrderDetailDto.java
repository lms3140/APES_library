package com.bookshop.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetailDto {
    private Long orderId;
    private String orderDate;
    private String orderStatus;
    private List<OrderItemDto> items;
    private String receiverName;
    private String phone;
    private AddressDto address;
    private int totalAmount;
    private int originalAmount;
    private int earnedPoint;
    private String paymentMethod;

}
