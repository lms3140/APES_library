package com.bookshop.dto;

import lombok.Data;

@Data
public class ReviewCreateReqDto {
    private Long bookId;
    private Integer rating;
    private String content;
}
