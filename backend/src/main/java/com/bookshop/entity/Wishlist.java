package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@IdClass(WishlistId.class)
public class Wishlist {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;
}
