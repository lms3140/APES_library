package com.bookshop.entity;

import com.bookshop.entity.book.BookAuthorId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BookAuthor {

    @EmbeddedId
    private BookAuthorId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("authorId")
    @JoinColumn(name = "author_id")
    private Author author;

    public BookAuthor(Book book, Author author) {
        this.book = book;
        this.author = author;
        this.id = new BookAuthorId(book.getBookId(), author.getAuthorId());
    }
}