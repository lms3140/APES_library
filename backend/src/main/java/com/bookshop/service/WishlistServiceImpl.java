package com.bookshop.service;

import com.bookshop.dto.BookDto;
import com.bookshop.dto.WishlistRespDto;
import com.bookshop.entity.Book;
import com.bookshop.entity.Member;
import com.bookshop.entity.Wishlist;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    @Override
    public List<BookDto> getWishlist() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("유저 못찾음"));


        return wishlistRepository.findByMemberMemberId(member.getMemberId())
                .stream()
                .map(w -> new BookDto(w.getBook())) // 엔티티 → DTO
                .toList();
    }

    @Override
    public int addWishlist(Long bookId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("유저 못찾음"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()->new RuntimeException("책 못찾음"));

        if (wishlistRepository.existsByMemberMemberIdAndBookBookId(member.getMemberId(), book.getBookId())) {
            return 0;  // 이미 존재함
        }
        wishlistRepository.save(new Wishlist(member,book));

        return 1;
    }

    @Override
    public int deleteWishlist(Long bookId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("유저 못찾음"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()->new RuntimeException("책 못찾음"));
        if (wishlistRepository.existsByMemberMemberIdAndBookBookId(member.getMemberId(), book.getBookId())) {
            wishlistRepository.deleteByMemberMemberIdAndBookBookId(member.getMemberId(), book.getBookId());
            return 1;
        }

        return 0;
    }

    @Transactional
    @Override
    public WishlistRespDto toggleWishlist(Long bookId) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("유저 못찾음"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("책 못찾음"));

        boolean exists = wishlistRepository
                .existsByMemberMemberIdAndBookBookId(member.getMemberId(), book.getBookId());

        if (exists) {
            wishlistRepository.deleteByMemberMemberIdAndBookBookId(member.getMemberId(), book.getBookId());
            return new WishlistRespDto(false, "찜 목록에서 제거되었습니다.");
        } else {
            wishlistRepository.save(new Wishlist(member, book));
            return new WishlistRespDto(true, "찜 목록에 추가되었습니다.");
        }
    }
}
