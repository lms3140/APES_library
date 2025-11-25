package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.CartItemDto;
import com.bookshop.entity.Cart;
import com.bookshop.entity.Member;
import com.bookshop.entity.Book;
import com.bookshop.repository.CartRepository;
import com.bookshop.repository.MemberRepository;
import com.bookshop.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/*
  CartServiceImpl
  - CartService 인터페이스 구현
  - 장바구니 CRUD와 기존 cartToPayment 기능 포함
*/
@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    public CartServiceImpl(CartRepository cartRepository,
                           MemberRepository memberRepository,
                           BookRepository bookRepository) {
        this.cartRepository = cartRepository;
        this.memberRepository = memberRepository;
        this.bookRepository = bookRepository;
    }

    /*
      장바구니에 항목 추가
      - 이미 장바구니에 존재하면 수량 증가
      - 존재하지 않으면 새 항목 생성
    */
    @Override
    @Transactional
    public void addCartItem(Long memberId, Long bookId, Integer quantity) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        Cart cartItem = cartRepository.findByMemberAndBook(member, book)
                .orElse(new Cart());

        cartItem.setMember(member);
        cartItem.setBook(book);
        cartItem.setQuantity(cartItem.getQuantity() + quantity);

        cartRepository.save(cartItem);
    }

    /*
      장바구니 항목 수량 수정
    */
    @Override
    @Transactional
    public void updateCartItem(Long memberId, Long bookId, Integer quantity) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        Cart cartItem = cartRepository.findByMemberAndBook(member, book)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.setQuantity(quantity);
        cartRepository.save(cartItem);
    }

    /*
      장바구니 항목 삭제
    */
    @Override
    @Transactional
    public void removeCartItem(Long memberId, Long bookId) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        cartRepository.deleteByMemberAndBook(member, book);
    }

    /*
      회원 장바구니 전체 조회
    */
    @Override
    public List<CartItemDto> getCartItems(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow();

        return cartRepository.findByMember(member).stream()
                .map(cart -> {
                    CartItemDto dto = new CartItemDto();
                    dto.setBookId(cart.getBook().getBookId());
                    dto.setQuatity(cart.getQuantity());
                    return dto;
                }).collect(Collectors.toList());
    }

    /*
      기존 팀원 구현 유지
      - CartItemDto 리스트를 받아서 BookDetailDto 리스트 반환
    */
    @Override
    public List<BookDetailDto> cartToPayment(List<CartItemDto> cartItems) {
        return cartItems.stream()
                .map(item -> bookRepository.findDetailByBookId(item.getBookId()))
                .collect(Collectors.toList());
    }
}
