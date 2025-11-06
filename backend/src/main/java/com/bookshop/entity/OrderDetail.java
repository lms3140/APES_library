package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class OrderDetail extends BaseCreatedEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailId;

    private Integer quantity;
    private Integer unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    private PurchaseOrder order;

    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;
}