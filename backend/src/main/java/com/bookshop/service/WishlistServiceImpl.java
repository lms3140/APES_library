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
import java.util.Set;
import java.util.stream.Collectors;

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
    public List<BookDto> addWishlists(List<Long> bookIds) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("유저 못찾음"));

        // 1) ID 목록으로 Book 조회
        List<Book> books = bookRepository.findAllById(bookIds);

        // 2) 이미 존재하는 wishlist 조회
        List<Wishlist> existing = wishlistRepository
                .findByMemberMemberIdAndBookBookIdIn(member.getMemberId(), bookIds);

        Set<Long> existingBookIds = existing.stream()
                .map(w -> w.getBook().getBookId())
                .collect(Collectors.toSet());

        // 3) 신규 책만 필터링
        List<Book> newBooks = books.stream()
                .filter(book -> !existingBookIds.contains(book.getBookId()))
                .toList();

        // 4) Wishlist 엔티티 생성 후 저장
        List<Wishlist> toInsert = newBooks.stream()
                .map(book -> new Wishlist(member, book))
                .collect(Collectors.toList());

        if (!toInsert.isEmpty()) {
            wishlistRepository.saveAll(toInsert);
        }

        // 5) BookDto로 변환해 반환
        return newBooks.stream()
                .map(BookDto::new)
                .collect(Collectors.toList());
    }
    @Override
    @Transactional
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

    @Override
    public boolean existWish(Long bookId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new RuntimeException("유저 못찾음"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()->new RuntimeException("책 못찾음"));


        return wishlistRepository.existsByMemberMemberIdAndBookBookId(member.getMemberId(),book.getBookId());
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
