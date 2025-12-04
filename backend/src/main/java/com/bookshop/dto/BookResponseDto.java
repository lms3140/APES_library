package com.bookshop.dto;

import com.bookshop.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BookResponseDto {
    private Long bookId;
    private String title;
    private Integer price;
    private Integer point;
    private String imageUrl;

    private String categoryName;  // 필요하다면
    private String publisherName;

    private List<String> authors;       // ⭐ 저자 추가

    public BookResponseDto(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.price = book.getPrice();
        this.point = book.getPoint();
        this.imageUrl = book.getImageUrl();

        this.publisherName = book.getPublisher().getName();
        this.categoryName = book.getSubcategory()
                .getCategory()
                .getCategoryName();


        // ⭐ BookAuthor → Author.name
        this.authors = book.getBookAuthors()
                .stream()
                .map(ba -> ba.getAuthor().getName())
                .toList();

    }
}
