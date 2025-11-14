package com.bookshop.repository;

import com.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SearchRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContaining(String keyword);

    @Query("""
            select distinct b from Book b
            join b.bookAuthors ba
            join ba.author a
            where a.name like %:keyword%
            """)
    List<Book> findByAuthorName(@Param("keyword") String keyword);
}
