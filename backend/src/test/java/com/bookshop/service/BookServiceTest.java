//package com.bookshop.service;
//
//import com.bookshop.dto.BookDetailDto;
//import com.bookshop.repository.BookRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//class BookServiceTest {
//    @Autowired
//    private BookService bookService;
//
//    @Autowired
//    private BookRepository bookRepository;
//
//    @Test
//    void getBookDetail() {
//
//        // given
//        Long bookId = 1L;
//
//        // when
//        BookDetailDto result = bookService.getBookDetail(bookId);
//
//        // then
//        assertThat(result).isNotNull();
//        assertThat(result.bookId()).isEqualTo(bookId);
//        assertThat(result.title()).isNotBlank();
//        assertThat(result.authors()).isNotEmpty();
//        System.out.println(result);
//    }
//}