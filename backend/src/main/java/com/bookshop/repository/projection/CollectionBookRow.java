package com.bookshop.repository.projection;

public interface CollectionBookRow {
    Long getCollectionId();
    String getCollectionName();
    String getDescription();
    Integer getCollectionDisplayOrder();

    Long getBookId();
    String getTitle();
    String getImageUrl();
    Integer getBookDisplayOrder();
}
