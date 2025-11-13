package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface BookService {
    public BookDetailDto findByBookIdDetail(Long bookId);
}