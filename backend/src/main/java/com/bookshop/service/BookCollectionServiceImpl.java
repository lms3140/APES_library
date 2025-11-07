package com.bookshop.service;

import com.bookshop.dto.BookSummaryDto;
import com.bookshop.dto.CollectionResponseDto;
import com.bookshop.repository.BookCollectionRepository;
import com.bookshop.repository.projection.CollectionBookRow;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookCollectionServiceImpl implements BookCollectionService {

    private final BookCollectionRepository bookCollectionRepository;

    public List<CollectionResponseDto> getCollections() {

        // row 조회
        List<CollectionBookRow> rows = bookCollectionRepository.findCollectionsWithBooks();

        // collectionId 기준으로 묶기
        Map<Long, CollectionResponseDto> map = new LinkedHashMap<>();

        for (CollectionBookRow row : rows) {
            map.computeIfAbsent(
                    row.getCollectionId(),
                    id -> new CollectionResponseDto(
                            row.getCollectionId(),
                            row.getCollectionName(),
                            row.getDescription(),
                            new ArrayList<>()
                    )
            );

            // 해당 컬렉션의 책 목록에 추가
            map.get(row.getCollectionId())
                    .books()
                    .add(new BookSummaryDto(
                            row.getBookId(),
                            row.getTitle(),
                            row.getImageUrl()
                    ));
        }

        // 4) 리스트로 반환
        return new ArrayList<>(map.values());
    }
}
