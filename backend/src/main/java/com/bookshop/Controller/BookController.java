package com.bookshop.Controller;


import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.BookDto;
import com.bookshop.dto.book.BookCreateRequestDto;
import com.bookshop.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//책 전체 정보객체 및 제목, 작가, 가격, 책포인트, 이미지, 책설명을 전달

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/detail/{bookId}")
    public BookDetailDto getBookDetail(@PathVariable Long bookId){
        BookDetailDto result = bookService.findByBookIdDetail(bookId);
        System.out.println(bookId);
        return result;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createBook(@RequestBody BookCreateRequestDto requestDto){

        long id = bookService.createBook(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/list")
    public List<BookDto> getBookList(){

        return null;
    }

}
