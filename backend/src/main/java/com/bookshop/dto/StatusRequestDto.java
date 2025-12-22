package com.bookshop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusRequestDto {

    // ACTIVE / BLOCK / WITHDRAW
    private String status;

    // 차단 사유 (BLOCK일 때만 사용)
    private String reason;
}
