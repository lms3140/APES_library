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

    private Long reviewId;
    private Long memberId;
    private Long bookId;
    private Integer rating;
    private String content;
    private String createdAt;

    @Builder
    public ReviewDto(Long reviewId, Long memberId, Long bookId,
                     Integer rating, String content, String createdAt) {
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.bookId = bookId;
        this.rating = rating;
        this.content = content;
        this.createdAt = createdAt;
    }
}
