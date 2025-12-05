package com.bookshop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 리뷰 데이터를 프론트엔드로 전달하기 위한 DTO
 */
@Getter
@NoArgsConstructor
public class ReviewDto {

    private String imageUrl;
    private String title;
    private String authors;
    private Long reviewId;
    private Long memberId;
    private String userId;
    private Long bookId;
    private Integer rating;
    private String content;
    private String createdAt;

    @Builder
    public ReviewDto(String imageUrl, String title, String authors, Long reviewId, Long memberId, Long bookId,
                     Integer rating, String content, String createdAt,String userId) {
        this.imageUrl = imageUrl;
        this.title = title;
        this.authors = authors;
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.bookId = bookId;
        this.rating = rating;
        this.content = content;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
