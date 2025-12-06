package com.bookshop.repository;

import com.bookshop.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * 리뷰 데이터 접근용 Repository
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBook_BookIdOrderByCreatedAtDesc(Long bookId);
    List<Review> findByBook_BookIdOrderByCreatedAtAsc(Long bookId);
    List<Review> findByMember_MemberId(Long memberId);

}
