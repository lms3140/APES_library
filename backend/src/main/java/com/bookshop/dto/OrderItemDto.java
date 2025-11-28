package com.bookshop.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long bookId;
    private String title;
    private String imageUrl;
    private int quantity;
    private int unitPrice;

    public OrderItemDto() {}
    public OrderItemDto(Long bookId, String title, String imageUrl, int quantity, int unitPrice) {
        this.bookId = bookId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}
