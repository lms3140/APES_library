package com.bookshop.Controller;

import com.bookshop.dto.ReviewDto;
import com.bookshop.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 리뷰 관련 REST API
 */
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰 목록 조회
    @GetMapping
    public List<ReviewDto> getReviews(
            @RequestParam("book_id") Long bookId,
            @RequestParam(defaultValue = "최신순") String sort
    ) {
        return reviewService.getReviews(bookId, sort);
    }

    // 리뷰 요약 조회
    @GetMapping("/summary")
    public Object getSummary(@RequestParam("book_id") Long bookId) {
        return reviewService.getReviewSummary(bookId);
    }

    // 리뷰 작성
    @PostMapping
    public ReviewDto createReview(
            @RequestParam Long bookId,
            @RequestParam Long memberId,
            @RequestParam Integer rating,
            @RequestParam String content
    ) {
        return reviewService.createReview(bookId, memberId, rating, content);
    }
}
