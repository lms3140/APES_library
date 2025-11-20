package com.bookshop.service;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPage;

import java.util.List;

public interface AdminPageService {
    public List<AdminPageDto> findAllBooks();
    public List<AdminPageDto> searchBooks(String type, String keyword);
//    public AdminPageDto findBookDetail(Long BookId);
}
