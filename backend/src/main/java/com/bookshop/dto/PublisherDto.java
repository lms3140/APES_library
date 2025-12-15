package com.bookshop.dto;

import com.bookshop.entity.Publisher;
import lombok.Data;

@Data
public class PublisherDto {
    private Long publisherId;
    private String name;

    public PublisherDto(Publisher publisher){
        this.publisherId =publisher.getPublisherId();
        this.name = publisher.getName();
    }
}
