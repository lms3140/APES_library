package com.bookshop.service.book;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.BookDto;
import com.bookshop.dto.book.BookCreateRequestDto;

import java.util.List;

public interface BookService {
    public BookDetailDto findByBookIdDetail(Long bookId);
    public Long createBook(BookCreateRequestDto requestDto);
}