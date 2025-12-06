package com.bookshop.service;

import com.bookshop.dto.ReviewDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

/**
 * 리뷰 관련 서비스 인터페이스
 */
public interface ReviewService {
    List<ReviewDto> getReviews(Long bookId, String sort);
    ReviewDto createReview(Long bookId, Integer rating, String content);
    // 리뷰 요약 데이터 (평균, 개수 등)
    Object getReviewSummary(Long bookId);
    List<ReviewDto> getMyReviews();
    void deleteReview(Long reviewId, HttpServletRequest request);
}
