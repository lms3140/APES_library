package com.bookshop.dto;

import com.bookshop.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryAddressDto {
    private Long addressId;
    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String addressName;
    private boolean isDefault;

    public HistoryAddressDto(Address address) {
        this.addressId = address.getAddressId();
        this.recipientName = address.getRecipientName();
        this.phone = address.getPhone();
        this.addressLine1 = address.getAddressLine1();
        this.addressLine2 = address.getAddressLine2();
        this.zipCode = address.getZipCode();
        this.addressName = address.getAddressName();
        this.isDefault = address.isDefault();
    }
}
