package com.bookshop.repository;

import com.bookshop.entity.BookCollection;
import com.bookshop.repository.projection.CollectionBookRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookCollectionRepository extends JpaRepository<BookCollection, Long> {

    @Query(value = "SELECT * FROM collection_vw", nativeQuery = true)
    List<CollectionBookRow> findCollectionsWithBooks();
}