package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/*
  Cart 엔티티
  - 회원(Member)과 도서(Book)를 연결하여 장바구니 항목을 나타냄
  - quantity 필드를 통해 몇 권을 담았는지 관리
*/
@Entity
@Table(name = "cart")
@Getter
@Setter
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId; // 장바구니 PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id") // member 테이블과 FK 연결
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id") // book 테이블과 FK 연결
    private Book book;

    @Column(nullable = false)
    private Integer quantity = 1; // 수량, 기본값 1
}
