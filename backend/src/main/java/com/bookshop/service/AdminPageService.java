package com.bookshop.service;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPage;

import java.util.List;

public interface AdminPageService {
    public List<AdminPageDto> findAllBooks();
    public List<AdminPageDto> findBookData(Long bookId);
    public List<AdminPageDto> searchBooks(String type, String keyword);
    public List<AdminPageDetailDto> findAdminBookDetail(Long BookId);
}
