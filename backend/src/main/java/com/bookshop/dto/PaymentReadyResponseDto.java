package com.bookshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentReadyResponseDto {
    private String redirectUrl;
    private String orderId;
}