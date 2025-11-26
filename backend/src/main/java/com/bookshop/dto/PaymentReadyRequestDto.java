package com.bookshop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentReadyRequestDto {
    private String orderId;     // 우리 쪽 주문 번호
    private String userId;      // 사용자 ID
    private String itemName;    // 상품명
    private int quantity;       // 수량
    private int totalAmount;    // 총 금액
}