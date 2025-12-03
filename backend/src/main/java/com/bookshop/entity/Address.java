package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Address extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String addressName;
    private boolean isDefault;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Address(Member member,
                   String recipientName,
                   String phone,
                   String addressLine1,
                   String addressLine2,
                   String zipCode,
                   String addressName,
                   boolean isDefault) {
        this.member = member;
        this.recipientName = recipientName;
        this.phone = phone;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.zipCode = zipCode;
        this.addressName = addressName;
        this.isDefault = isDefault;
    }

}
