package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class PurchaseOrder extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Setter
    private String orderStatus = "READY";

    @Setter
    private Integer originalAmount;

    @Setter
    private Integer totalAmount;

    @Setter
    private int earnedPoint;

    @Setter
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
        this.orderStatus = "READY";
        this.originalAmount = originalAmount;
    }

    // 결제 승인 시
    public void approve() {
        this.orderStatus = "PAID";
        this.paidAt = LocalDateTime.now();
    }

    public void cancel() {
        this.orderStatus = "CANCEL";
    }

    public void fail() {
        this.orderStatus = "FAIL";
    }

    public void error(){
        this.orderStatus = "ERROR";
    }

    public void deleted() {
        this.deleted = true;
    }


}