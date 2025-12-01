package com.bookshop.dto;

import lombok.Data;

@Data
public class AddressDto {
    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
}
