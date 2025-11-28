package com.bookshop.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaymentReadyRequestDto {
    private String userId;      // 사용자 ID
    private String itemName;    // 상품명
    private int quantity;       // 수량
    private int totalAmount;    // 총 금액
    private Long addressId;
    private int point;

    private List<PayItemDto> books; // 책 리스트
}