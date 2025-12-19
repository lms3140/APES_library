package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.query.Order;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PurchaseOrder extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.READY;

    private Integer originalAmount;

    private Integer totalAmount;

    private int earnedPoint;

    private String tid;

    private LocalDateTime paidAt;
    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    // 편의 생성자
    public PurchaseOrder(Member member, Address address, Integer totalAmount,int originalAmount) {
        this.member = member;
        this.address = address;
        this.totalAmount = totalAmount;
        this.originalAmount = originalAmount;
        this.orderStatus = OrderStatus.READY;
    }

    // 결제 승인 시
    public void approve() {
        this.orderStatus = OrderStatus.PAID;
        this.paidAt = LocalDateTime.now();
    }

    public void cancel() {
        this.orderStatus = OrderStatus.CANCEL;
    }

    public void fail() {
        this.orderStatus = OrderStatus.FAIL;
    }

    public void error(){
        this.orderStatus = OrderStatus.ERROR;
    }

    public void deliver() {
        this.orderStatus = OrderStatus.DELIVER;
    }

    public void deleted() {
        this.deleted = true;
    }


}