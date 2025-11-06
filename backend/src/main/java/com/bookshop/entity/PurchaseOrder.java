package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class PurchaseOrder extends BaseCreatedEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String orderStatus;
    private Integer totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Address address;
}