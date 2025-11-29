package com.bookshop.service;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import com.bookshop.dto.AdminSummaryDto;
import com.bookshop.entity.Admin.*;
import com.bookshop.repository.Admin.*;
import com.bookshop.repository.projection.DailySalesProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class AdminPageServiceImpl implements AdminPageService {
    public final AdminPageRepository adminPageRepository;
    private final AdminSummaryRepository adminSummaryRepository;
    private final Top5QuantityRepository top5QuantityRepository;
    private final Top5RevenueRepository top5RevenueRepository;
    private final DailySalesRepository dailySalesRepository;
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

    @Override
    public List<AdminPageDto> findBookData(Long bookId) {
        List<AdminPage> result = adminPageRepository.findByBookId(bookId);

        return result.stream()
                .map(AdminPageDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminPageDetailDto> findAdminBookDetail(Long bookId) {
        List<AdminPageDetail> result = adminPageRepository.findAdminBookDetail(bookId);

        return Optional.ofNullable(result)
                        .orElse(List.of())
                        .stream()
                        .map(AdminPageDetailDto::new)
                        .collect(Collectors.toList());
    }

    @Override
    public int getTotalRevenue() {
        return adminPageRepository.findAllBooks()
                .stream()
                .mapToInt(AdminPageDto::getTotalSalesPrice)
                .sum();
    }

    @Override
    public AdminSummaryDto getSummary() {
        AdminPageSummary e = adminSummaryRepository.findSummary().getFirst();
        return new AdminSummaryDto(e);
    }

    @Override
    public List<Top5QuantityView> getTop5Quantity() {
        return top5QuantityRepository.findAll();
    }

    @Override
    public List<Top5RevenueView> getTop5Revenue() {
        return top5RevenueRepository.findAll();
    }

    @Override
    public List<DailySalesProjection> getLast7DaysSales() {
        return dailySalesRepository.getLast7DaysSales();
    }


}
