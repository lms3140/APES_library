package com.bookshop.repository;

import com.bookshop.entity.Book;
import com.bookshop.entity.Wishlist;
import com.bookshop.entity.WishlistId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByMemberMemberId(Long memberId);
    boolean existsByMemberMemberIdAndBookBookId(Long memberId, Long bookId);
    void deleteByMemberMemberIdAndBookBookId(Long memberId, Long bookId);
    List<Wishlist> findByMemberMemberIdAndBookBookIdIn(Long memberId, List<Long> bookIds);
}
