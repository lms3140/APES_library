package com.bookshop.dto;

import lombok.Data;

@Data
public class KakaoPayApproveDto {
    private String orderId;
    private String pgToken;

}
