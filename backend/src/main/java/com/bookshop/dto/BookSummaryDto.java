package com.bookshop.dto;

public record BookSummaryDto(
        Long bookId,
        String title,
        String imageUrl
) {}
