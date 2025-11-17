package com.bookshop.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;
@Data
@Entity
public class BookDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
