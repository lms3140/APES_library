package com.bookshop.Controller;


import com.bookshop.dto.BookDetailDto;
import com.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/detail")
    public BookDetailDto getBookDetail(@RequestParam int bid){
        return  bookService.getBookDetail((long) bid);
    }
}
