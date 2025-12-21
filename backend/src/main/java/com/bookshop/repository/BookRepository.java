package com.bookshop.repository;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Long> {




    @Query(value = """
        SELECT 
            b.book_id AS bookId,
            b.title AS title,
            c.category_name AS categoryName,
            s.subcategory_name AS subcategoryName,
            b.price AS price,
            b.point AS point,
            b.published_date AS publishedDate,
            b.description AS description,
            b.image_url AS imageUrl,
            GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
            GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS translators
        FROM 
            book b
            JOIN subcategory s ON b.subcategory_id = s.subcategory_id
            JOIN category c ON s.category_id = c.category_id
            JOIN book_author ba ON b.book_id = ba.book_id
            JOIN author a ON ba.author_id = a.author_id
            LEFT JOIN book_translator bt ON b.book_id = bt.book_id
            LEFT JOIN translator t ON bt.translator_id = t.translator_id
        WHERE b.book_id = :bookId
        GROUP BY 
            b.book_id, b.title, c.category_name, s.subcategory_name,
            b.price, b.point, b.published_date, b.description, b.image_url
        """,
            nativeQuery = true)
    BookDetailDto findDetailByBookId(@Param("bookId") Long bookId);



}