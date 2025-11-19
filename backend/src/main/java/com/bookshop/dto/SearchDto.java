package com.bookshop.dto;

import com.bookshop.entity.Book;
import com.bookshop.entity.Subcategory;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class SearchDto {
    private Long bookId;
    private String title;
    private Integer price;
    private Integer point;
    private LocalDate publishedDate;
    private String description;
    private String imageUrl;
    private List<String> authors;
    private List<String> translators;
    private Long subcategoryId;
    private String subcategoryName;
    private Long categoryId;
    private String categoryName;
    private long publisherId;
    private String publisherName;

    public SearchDto() {}
    public SearchDto(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.price = book.getPrice();
        this.point = book.getPoint();
        this.publishedDate = book.getPublishedDate();
        this.description = book.getDescription();
        this.imageUrl = book.getImageUrl();

        // 저자 리스트 매핑
        this.authors = book.getBookAuthors()
                .stream()
                .map(ba -> ba.getAuthor().getName())
                .toList();
        this.translators = book.getBookTranslators()
                .stream()
                .map(bt -> bt.getTranslator().getName())
                .toList();

        if(book.getPublisher() != null) {
            this.publisherId = book.getPublisher().getPublisherId();
            this.publisherName = book.getPublisher().getName();
        }

        if(book.getSubcategory() != null) {
            this.subcategoryId = book.getSubcategory().getSubcategoryId();
            this.subcategoryName = book.getSubcategory().getSubcategoryName();

            if(book.getSubcategory().getCategory() != null) {
                this.categoryId = book.getSubcategory().getCategory().getCategoryId();
                this.categoryName = book.getSubcategory().getCategory().getCategoryName();
            }
        }
    }
}
