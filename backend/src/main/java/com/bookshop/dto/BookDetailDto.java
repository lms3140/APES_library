package com.bookshop.dto;

import com.bookshop.entity.BookDetail;
import lombok.Data;

import java.sql.Date;

@Data
public class BookDetailDto {
    private Long bookId;
    private String title;
    private String categoryName;
    private String subcategoryName;
    private Integer price;
    private Integer point;
    private Date publishedDate;
    private String description;
    private String imageUrl;
    private String authors;
    private String translators;

    public BookDetailDto() {}
    public BookDetailDto(BookDetail bookDetail) {
        this.bookId = bookDetail.getBookId();
        this.title = bookDetail.getTitle();
        this.categoryName = bookDetail.getCategoryName();
        this.subcategoryName = bookDetail.getSubcategoryName();
        this.price = bookDetail.getPrice();
        this.point = bookDetail.getPoint();
        this.publishedDate = bookDetail.getPublishedDate();
        this.description = bookDetail.getDescription();
        this.imageUrl = bookDetail.getImageUrl();
        this.authors = bookDetail.getAuthors();
        this.translators = bookDetail.getTranslators();
    }
}