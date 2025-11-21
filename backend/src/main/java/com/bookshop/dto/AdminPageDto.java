package com.bookshop.dto;

import com.bookshop.entity.AdminPage;
import lombok.Data;

@Data
public class AdminPageDto {
    private Long bookId;
    private String title;
    private String image_url;
    private Integer totalSalesQuantity;
    private Integer totalPrice;

    public AdminPageDto() {}
    public AdminPageDto(AdminPage adminPage) {
        this.bookId = adminPage.getBookId();
        this.title = adminPage.getTitle();
        this.image_url = adminPage.getImage_url();
        this.totalSalesQuantity = adminPage.getTotalSalesQuantity();
        this.totalPrice = adminPage.getTotalPrice();
    }

}
