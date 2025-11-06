package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class CollectionBook extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long collectionBookId;

    private Integer displayOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    private BookCollection collection;

    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;
}