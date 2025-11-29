package com.bookshop.dto;

import com.bookshop.entity.Admin.AdminPageDetail;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdminPageDetailDto {
    private Long bookId;
    private String userId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    private Integer quantity;
    private Long unitPrice;

    public AdminPageDetailDto() {}
    public AdminPageDetailDto(AdminPageDetail adminPageDetail) {
        this.bookId = adminPageDetail.getBookId();
        this.userId = adminPageDetail.getUserId();
        this.createdAt = adminPageDetail.getCreatedAt();
        this.quantity = adminPageDetail.getQuantity();
        this.unitPrice = adminPageDetail.getUnitPrice();
    }
}
