package com.bookshop.service;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import com.bookshop.dto.AdminSummaryDto;
import com.bookshop.entity.Admin.Top5QuantityView;
import com.bookshop.entity.Admin.Top5RevenueView;
import com.bookshop.repository.projection.DailySalesProjection;

import java.util.List;

public interface AdminPageService {
    public List<AdminPageDto> findAllBooks();
    public List<AdminPageDto> findBookData(Long bookId);
    public List<AdminPageDto> searchBooks(String type, String keyword);
    public List<AdminPageDetailDto> findAdminBookDetail(Long BookId);
    public int getTotalRevenue();
    public AdminSummaryDto getSummary();
    public List<Top5QuantityView> getTop5Quantity();
    public List<Top5RevenueView> getTop5Revenue();
    public List<DailySalesProjection> getLast7DaysSales();
}
