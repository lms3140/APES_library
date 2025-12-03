package com.bookshop.dto;

import com.bookshop.entity.Address;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private long addressId;
    private long memberId;
    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String addressName;

    @JsonProperty("isDefault")
    private boolean isDefault;

    public AddressDto(Address address) {
        this.addressId = address.getAddressId();
        this.memberId = address.getMember().getMemberId();
        this.recipientName = address.getRecipientName();
        this.phone = address.getPhone();
        this.addressLine1 = address.getAddressLine1();
        this.addressLine2 = address.getAddressLine2();
        this.zipCode = address.getZipCode();
        this.addressName = address.getAddressName();
        this.isDefault = address.isDefault();
    }
}
