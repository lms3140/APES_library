package com.bookshop.dto;


import com.bookshop.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private Long bookId;
    private String title;
    private Integer price;
    private String imageUrl;

    // Book → DTO 변환용 생성자
    public BookDto(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.price = book.getPrice();
        this.imageUrl = book.getImageUrl();
    }
}
