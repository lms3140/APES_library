package com.bookshop.Controller;

import com.bookshop.dto.ReviewCreateReqDto;
import com.bookshop.dto.ReviewDto;
import com.bookshop.service.ReviewService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
            @RequestBody ReviewCreateReqDto dto
            ) {
        return reviewService.createReview(dto.getBookId(), dto.getRating(), dto.getContent());
    }

    @GetMapping("/my")
    public List<ReviewDto> getMyReviews() {
        return reviewService.getMyReviews();
    }

    @PostMapping("/delete")
    public String deleteReview(@RequestBody Map<String, Long> body, HttpServletRequest request) {
        Long reviewId = body.get("reviewId");
        reviewService.deleteReview(reviewId, request);
        return "OK";
    }
}
