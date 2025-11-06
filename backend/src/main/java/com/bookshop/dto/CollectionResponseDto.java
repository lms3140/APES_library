package com.bookshop.dto;

import java.util.List;

public record CollectionResponseDto(
        Long collectionId,
        String collectionName,
        String description,
        List<BookSummaryDto> books
) {}

