package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class OrderDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailId;

    private Integer quantity;
    private Integer unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id")
    private PurchaseOrder order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id")
    private Book book;

    public OrderDetail(PurchaseOrder order, Book book, Integer quantity, Integer unitPrice) {
        this.order = order;
        this.book = book;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}