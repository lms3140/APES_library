package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    // 평점 (1~5)
    private Integer rating;

    // 리뷰 내용, 길이 제한 없이 TEXT 타입
    @Column(columnDefinition = "TEXT")
    private String content;

    // 작성자 (회원) - 지연 로딩, 외래키 member_id 지정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 리뷰 대상 도서 - 지연 로딩, 외래키 book_id 지정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
