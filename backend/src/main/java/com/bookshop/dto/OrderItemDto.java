package com.bookshop.dto;

import com.bookshop.entity.OrderDetail;
import lombok.Data;

@Data
public class OrderItemDto {
    private Long bookId;
    private String title;
    private String imageUrl;
    private int quantity;
    private int unitPrice;
    private String categoryName;

    public OrderItemDto() {}
    public OrderItemDto(Long bookId, String title, String imageUrl, int quantity, int unitPrice) {
        this.bookId = bookId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    public OrderItemDto(OrderDetail orderDetail){
        this.bookId = orderDetail.getBook().getBookId();
        this.title = orderDetail.getBook().getTitle();
        this.imageUrl = orderDetail.getBook().getImageUrl();
        this.quantity = orderDetail.getQuantity();
        this.unitPrice = orderDetail.getUnitPrice();
        this.categoryName = orderDetail.getBook().getSubcategory().getCategory().getCategoryName();

    }
}
