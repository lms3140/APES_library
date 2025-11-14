package com.bookshop.Controller;


import com.bookshop.dto.BookDetailDto;
import com.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


//책 전체 정보객체 및 제목, 작가, 가격, 책포인트, 이미지, 책설명을 전달

@RestController
@RequestMapping("/Book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("/detail")
    public BookDetailDto getBookDetail(@RequestBody BookDetailDto bookDetailDto){
        BookDetailDto result = bookService.findByBookIdDetail(bookDetailDto.getBookId());
        return result;
    }
    @PostMapping("/detail/title")
    public String getBookTitle(@RequestBody BookDetailDto bookDetailDto) {
        String result = "";
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getTitle();
        return result;
    }

    @PostMapping("/detail/author")
    public String getBookAuthor(@RequestBody BookDetailDto bookDetailDto) {
        String result = "";
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getAuthors();
        return result;
    }

    @PostMapping("/detail/price")
    public Integer getBookPrice(@RequestBody BookDetailDto bookDetailDto) {
        Integer result = 0;
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getPrice();
        return result;
    }

    @PostMapping("/detail/point")
    public Integer getBookPoint(@RequestBody BookDetailDto bookDetailDto) {
        Integer result = 0;
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getPoint();
        return result;
    }

    @PostMapping("/detail/imageUrl")
    public String getBookImageUrl(@RequestBody BookDetailDto bookDetailDto) {
        String result = "";
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getImageUrl();
        return result;
    }

    @PostMapping("/detail/description")
    public String getBookDescription(@RequestBody BookDetailDto bookDetailDto) {
        String result = "";
        result = bookService.findByBookIdDetail(bookDetailDto.getBookId()).getDescription();
        return result;
    }
}
