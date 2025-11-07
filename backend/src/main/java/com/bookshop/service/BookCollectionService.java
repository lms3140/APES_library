package com.bookshop.service;

import com.bookshop.dto.CollectionResponseDto;

import java.util.List;

public interface BookCollectionService {
    List<CollectionResponseDto> getCollections();
}
