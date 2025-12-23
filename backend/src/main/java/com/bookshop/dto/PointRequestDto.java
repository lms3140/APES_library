package com.bookshop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointRequestDto {

    // +100 / -500 같은 증감 값
    private int amount;

    // 사유 (관리자 메모용)
    private String reason;
}
