package com.bookshop.repository;

import com.bookshop.entity.Book;
import com.bookshop.entity.BookAuthor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookAuthorRepository extends JpaRepository<BookAuthor,Long> {
    void deleteAllByBook(Book book);
}
