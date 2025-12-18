package com.bookshop.service.book;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.book.BookCreateRequestDto;

public interface BookService {
    public BookDetailDto findByBookIdDetail(Long bookId);
    public Long createBook(BookCreateRequestDto requestDto);
}