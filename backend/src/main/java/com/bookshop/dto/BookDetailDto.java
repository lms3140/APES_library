package com.bookshop.dto;

import com.bookshop.entity.BookDetail;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
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
}