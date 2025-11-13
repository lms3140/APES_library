package com.bookshop.entity;


import jakarta.persistence.Entity;
import lombok.Data;

import java.sql.Date;
@Data
@Entity
public class BookDetail {
    private Long bookId;
    private String title;
    private String categoryName;
    private String subcategoryName;
    private Integer price;
    private Integer point;
    private Date publishedDate;
    private String description;
    private String imageUrl;
    private String authors;
    private String translators;

}
