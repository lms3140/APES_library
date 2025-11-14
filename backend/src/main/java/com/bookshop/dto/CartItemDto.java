package com.bookshop.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long bookId;
    private Integer quatity;
}
