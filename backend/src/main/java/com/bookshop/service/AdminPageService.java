package com.bookshop.service;

import com.bookshop.dto.AdminPageDto;

import java.util.List;

public interface AdminPageService {
    public List<AdminPageDto> findAllBooks();
}
