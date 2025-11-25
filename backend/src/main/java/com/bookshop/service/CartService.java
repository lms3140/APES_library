package com.bookshop.service;

import com.bookshop.dto.CartItemDto;
import com.bookshop.dto.BookDetailDto;
import java.util.List;

/*
  CartService 인터페이스
  - 장바구니 관련 기능 정의
  - cartToPayment는 기존 팀원의 구현 유지
*/
public interface CartService {

    // 결제 페이지로 이동할 장바구니 항목 조회
    List<BookDetailDto> cartToPayment(List<CartItemDto> cartItems);

    // 장바구니에 항목 추가
    void addCartItem(Long memberId, Long bookId, Integer quantity);

    // 장바구니 항목 수량 수정
    void updateCartItem(Long memberId, Long bookId, Integer quantity);

    // 장바구니 항목 삭제
    void removeCartItem(Long memberId, Long bookId);

    // 회원 장바구니 전체 조회
    List<CartItemDto> getCartItems(Long memberId);
}
