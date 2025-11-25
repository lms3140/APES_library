package com.bookshop.repository;

import com.bookshop.entity.Cart;
import com.bookshop.entity.Member;
import com.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

/*
  CartRepository
  - JpaRepository를 상속하여 Cart CRUD 제공
  - 추가로 Member + Book 기반 조회, 삭제 메서드 정의
*/
public interface CartRepository extends JpaRepository<Cart, Long> {

    // 특정 회원과 책에 해당하는 장바구니 항목 조회
    Optional<Cart> findByMemberAndBook(Member member, Book book);

    // 특정 회원의 장바구니 전체 조회
    List<Cart> findByMember(Member member);

    // 특정 회원과 책에 해당하는 장바구니 항목 삭제
    void deleteByMemberAndBook(Member member, Book book);
}
