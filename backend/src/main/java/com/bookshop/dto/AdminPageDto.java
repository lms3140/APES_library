package com.bookshop.dto;

import com.bookshop.entity.Admin.AdminPage;
import lombok.Data;

@Data
public class AdminPageDto {
    private Long bookId;
    private String title;
    private String image_url;
    private Integer totalSalesQuantity;
    private Integer totalSalesPrice;

    public AdminPageDto() {}
    public AdminPageDto(AdminPage adminPage) {
        this.bookId = adminPage.getBookId();
        this.title = adminPage.getTitle();
        this.image_url = adminPage.getImageUrl();
        this.totalSalesQuantity = adminPage.getTotalSalesQuantity();
        this.totalSalesPrice = adminPage.getTotalSalesAmount();
    }

}
