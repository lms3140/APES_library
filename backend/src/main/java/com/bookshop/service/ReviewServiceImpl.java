package com.bookshop.service;

import com.bookshop.dto.ReviewDto;
import com.bookshop.entity.Book;
import com.bookshop.entity.Member;
import com.bookshop.entity.Review;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.ReviewRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
    private final MemberService memberService;

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
                        .userId(r.getMember().getUserId())
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

        long totalReviews = reviews.size();
        double averageRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0);

        // 평점별 갯수 계산
        long count1 = reviews.stream().filter(r -> r.getRating() == 1).count();
        long count2 = reviews.stream().filter(r -> r.getRating() == 2).count();
        long count3 = reviews.stream().filter(r -> r.getRating() == 3).count();
        long count4 = reviews.stream().filter(r -> r.getRating() == 4).count();
        long count5 = reviews.stream().filter(r -> r.getRating() == 5).count();

        Map<Integer, Long> ratingCounts = Map.of(
                1, count1,
                2, count2,
                3, count3,
                4, count4,
                5, count5
        );

        // 프론트로 반환
        return Map.of(
                "totalReviews", totalReviews,
                "averageRating", averageRating,
                "ratingCounts", ratingCounts
        );
    }

    public List<ReviewDto> getMyReviews() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("회원정보를 찾을 수 없습니다."));
        List<Review> reviews = reviewRepository.findByMember_MemberId(member.getMemberId());

        return reviews.stream()
                .map(r -> ReviewDto.builder()
                        .imageUrl(r.getBook().getImageUrl())
                        .title(r.getBook().getTitle())
                        .authors(
                                r.getBook().getBookAuthors().stream()
                                        .map(ba -> ba.getAuthor().getName())
                                        .collect(Collectors.joining(", "))
                        )
                        .reviewId(r.getReviewId())
                        .memberId(member.getMemberId())
                        .bookId(r.getBook().getBookId())
                        .rating(r.getRating())
                        .content(r.getContent())
                        .createdAt(r.getCreatedAt().toString())
                        .userId(r.getMember().getUserId())
                        .build()
                ).toList();
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId, HttpServletRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰가 존재하지 않습니다."));
        Long currentMemberId = memberService.getCurrentMemberId(request);
        if(currentMemberId == null) {
            throw new IllegalArgumentException("로그인 정보가 없습니다.");
        }

        if(!review.getMember().getMemberId().equals(currentMemberId)) {
            throw new IllegalArgumentException("본인이 작성한 리뷰만 삭제할 수 있습니다");
        }
        reviewRepository.deleteById(reviewId);
    }
}
