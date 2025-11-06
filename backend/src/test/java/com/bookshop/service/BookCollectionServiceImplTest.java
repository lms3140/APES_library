package com.bookshop.service;

import com.bookshop.dto.BookSummaryDto;
import com.bookshop.dto.CollectionResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class BookCollectionServiceImplTest {
    @Autowired
    private BookCollectionServiceImpl bookCollectionServiceImpl;
    @Test
    void getCollections() {
        // when
        List<CollectionResponseDto> result = bookCollectionServiceImpl.getCollections();

        // then
        assertThat(result).isNotNull();
        System.out.print(result);

        for (CollectionResponseDto collection : result) {
            for (BookSummaryDto book : collection.books()) {
                System.out.println(
                        "[컬렉션 " + collection.collectionId() + "] " +
                                "책ID=" + book.bookId() + ", 제목=" + book.title()
                );
            }
        }
    }
}