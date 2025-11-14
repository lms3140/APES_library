package com.bookshop.service;

import com.bookshop.entity.Book;

import java.util.List;

public interface SearchService {
    List<Book> search(String keyword);

}
