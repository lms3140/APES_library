package com.bookshop.dto.author;

import com.bookshop.entity.Author;
import lombok.Data;

@Data
public class AuthorRespDto {
    private Long authorId;
    private String name;


    public AuthorRespDto(Author author){
        this.authorId = author.getAuthorId();
        this.name = author.getName();
    }
}
