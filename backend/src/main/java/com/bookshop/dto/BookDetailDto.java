package com.bookshop.dto;

import java.sql.Date;

public record BookDetailDto(
        Long bookId,
        String title,
        String categoryName,
        String subcategoryName,
        Integer price,
        Integer point,
        Date publishedDate,
        String description,
        String imageUrl,
        String authors,
        String translators
) {}