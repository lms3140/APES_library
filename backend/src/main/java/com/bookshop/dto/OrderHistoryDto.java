package com.bookshop.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderHistoryDto {
    private Long orderId;
    private String orderStatus;
    private Integer originalAmount;
    private LocalDateTime paidAt;

    private HistoryAddressDto address;
    private List<OrderItemDto> items;


}
