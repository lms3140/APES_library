package com.bookshop.Controller;

import com.bookshop.dto.book.BookCreateRequestDto;
import com.bookshop.dto.book.BookUpdateRespDto;
import com.bookshop.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/book")
@RequiredArgsConstructor
public class AdminBookController {
    private final BookService bookService;
    @GetMapping("/detail/{bookId}")
    public BookUpdateRespDto getAdminBookDetail(@PathVariable Long bookId){
        System.out.println(bookId);
        return bookService.findBookDetails(bookId);
    }

    @PostMapping("/save")
    public ResponseEntity<Long> saveBook(@RequestBody BookCreateRequestDto requestDto){

        long id = bookService.saveBook(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }
}
