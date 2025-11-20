package com.bookshop.service;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPage;
import com.bookshop.repository.AdminPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminPageServiceImpl implements AdminPageService {
    public final AdminPageRepository adminPageRepository;

    @Autowired
    public AdminPageServiceImpl(AdminPageRepository adminPageRepository) {
        this.adminPageRepository = adminPageRepository;
    }

    @Override
    public List<AdminPageDto> findAllBooks() {
        return adminPageRepository.findAllBooks();
    }

    @Override
    public List<AdminPageDto> searchBooks(String searchType, String keyword) {
        List<AdminPage> results;

        if (searchType.equals("title")) {
            results = adminPageRepository.findByTitle(keyword);
        } else if (searchType.equals("bookId")) {
            results = adminPageRepository.findByBookId(Long.parseLong(keyword));
        } else {
            results = List.of();
        }

        return results.stream()
                .map(AdminPageDto::new)
                .collect(Collectors.toList());
    }

//    @Override
//    public AdminPageDto findBookDetail(Long BookId) {
//        return adminPageRepository.findBookDetail();
//    }
}
