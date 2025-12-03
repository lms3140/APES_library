package com.bookshop.dto;

import com.bookshop.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AddressDto {
    private long memberId;
    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;

    public AddressDto(Address address) {
        this.recipientName = address.getRecipientName();
        this.phone = address.getPhone();
        this.addressLine1 = address.getAddressLine1();
        this.addressLine2 = address.getAddressLine2();
        this.zipCode = address.getZipCode();
    }
}
