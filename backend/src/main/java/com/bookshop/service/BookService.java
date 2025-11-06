package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public BookDetailDto getBookDetail(Long bookId) {

        return bookRepository.findDetailByBookId(bookId);
    }
}