package com.bookshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressDto {
    private long memberId;
    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    // 생성자, getter, setter
    public AddressDto(String recipientName, String phone, String addressLine1, String addressLine2, String zipCode) {
        this.recipientName = recipientName;
        this.phone = phone;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.zipCode = zipCode;
    }

}
