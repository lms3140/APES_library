package com.bookshop.dto.book;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class BookUpdateRespDto {
    private String title;
    private Long category;      // 미사용
    private Long subCategory;
    private Long publisher;
    private Integer price;
    private Integer point;
    private LocalDate publishedDate;
    private String description;
    private String imageUrl;
    private List<Long> author;

}
