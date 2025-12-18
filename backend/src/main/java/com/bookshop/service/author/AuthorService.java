package com.bookshop.service.author;

import com.bookshop.dto.author.AuthorRespDto;

import java.util.List;

public interface AuthorService {
    public List<AuthorRespDto> getList();
}
