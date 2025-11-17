package com.bookshop.service;

import com.bookshop.dto.AdminPageDto;
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
        return adminPageRepository.findAll()
                .stream()
                .map(AdminPageDto::new)
                .collect(Collectors.toList());
    }
}
