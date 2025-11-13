package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService{
    public final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookDetailDto findByBookIdDetail(Long bookId) {
        BookDetailDto bookInfo = bookRepository.findDetailByBookId(bookId);

        return bookInfo;
    }
}
