package com.bookshop.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long memberId;   // 회원 ID
    private Long bookId;     // 도서 ID
    private Integer quantity; // 수량
}
