package com.bookshop.service;

import com.bookshop.dto.ReviewDto;
import com.bookshop.entity.Book;
import com.bookshop.entity.Member;
import com.bookshop.entity.Review;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 리뷰 서비스 구현체
 */
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<ReviewDto> getReviews(Long bookId, String sort) {
        List<Review> reviews;

        // 정렬 옵션에 따라 리뷰 조회
        if ("오래된순".equals(sort)) {
            reviews = reviewRepository.findByBook_BookIdOrderByCreatedAtAsc(bookId);
        } else {
            reviews = reviewRepository.findByBook_BookIdOrderByCreatedAtDesc(bookId);
        }

        // Entity → DTO 변환
        return reviews.stream().map(r ->
                ReviewDto.builder()
                        .reviewId(r.getReviewId())
                        .memberId(r.getMember().getMemberId())
                        .bookId(r.getBook().getBookId())
                        .rating(r.getRating())
                        .content(r.getContent())
                        .createdAt(r.getCreatedAt().toString())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public ReviewDto createReview(Long bookId, Integer rating, String content) {
        Book book = bookRepository.findById(bookId).orElseThrow();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId).orElseThrow();

        Review review = new Review();
        review.setBook(book);
        review.setMember(member);
        review.setRating(rating);
        review.setContent(content);

        Review saved = reviewRepository.save(review);

        return ReviewDto.builder()
                .reviewId(saved.getReviewId())
                .memberId(member.getMemberId())
                .bookId(bookId)
                .rating(rating)
                .content(content)
                .createdAt(saved.getCreatedAt().toString())
                .build();
    }

    @Override
    public Object getReviewSummary(Long bookId) {
        List<Review> reviews = reviewRepository.findByBook_BookIdOrderByCreatedAtDesc(bookId);

        long count = reviews.size();
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);

        // 평점 요약 정보 반환
        return new Object() {
            public final long totalReviews = count;
            public final double averageRating = avg;
        };
    }
}
