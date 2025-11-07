package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Address extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String recipientName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}