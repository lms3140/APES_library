package com.bookshop.service.book;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.book.BookCreateRequestDto;
import com.bookshop.dto.book.BookUpdateRespDto;

public interface BookService {
    public BookDetailDto findByBookIdDetail(Long bookId);
    public Long saveBook(BookCreateRequestDto requestDto);

    BookUpdateRespDto findBookDetails(Long bookId);
}