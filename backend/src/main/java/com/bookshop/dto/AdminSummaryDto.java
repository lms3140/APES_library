package com.bookshop.dto;

import com.bookshop.entity.Admin.AdminPageSummary;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSummaryDto {

    private Long totalBookCount; // 전체등록된 도서의 갯수
    private Integer totalRevenue; // 매출 합계
    private Integer totalQuantity; // 판매된 총 권 수
    private Integer soldBookCount; // 판매된 책 종류 수

    public AdminSummaryDto(AdminPageSummary e) {
        this.totalBookCount = e.getTotalBookCount();
        this.totalRevenue = e.getTotalRevenue();
        this.totalQuantity = e.getTotalQuantity();
        this.soldBookCount = e.getSoldBookCount();
    }
}