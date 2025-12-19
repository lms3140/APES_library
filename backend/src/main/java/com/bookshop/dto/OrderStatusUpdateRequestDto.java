package com.bookshop.dto;

import com.bookshop.entity.OrderStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderStatusUpdateRequestDto {
    private OrderStatus orderStatus;
}
