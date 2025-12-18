package com.bookshop.dto.book;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookCreateRequestDto {
    private String title;
    private Long categoryId;      // 미사용
    private Long subCategoryId;
    private Long publisherId;
    private Integer price;
    private Integer point;
    private LocalDate publishedDate;
    private String description;
    private String imageUrl;
    private Long authorId;

}