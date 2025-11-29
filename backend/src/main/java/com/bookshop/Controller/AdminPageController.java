package com.bookshop.Controller;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import com.bookshop.dto.AdminSummaryDto;
import com.bookshop.entity.Admin.AdminPageDetailResponse;
import com.bookshop.entity.Admin.Top5QuantityView;
import com.bookshop.entity.Admin.Top5RevenueView;
import com.bookshop.repository.projection.DailySalesProjection;
import com.bookshop.service.AdminPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminPage")
@RequiredArgsConstructor
public class AdminPageController {
    private final AdminPageService adminPageService;

    @GetMapping
    public List<AdminPageDto> getAdminPage() {
        return adminPageService.findAllBooks();
    }

    @GetMapping("/summary")
    public AdminSummaryDto getTotalRevenue(){
        return adminPageService.getSummary();
    }

    @GetMapping("/search")
    public List<AdminPageDto> getSearchBooks(@RequestParam String searchType, @RequestParam String keyword) {
        return adminPageService.searchBooks(searchType, keyword);
    }

    // top5 판매량
    @GetMapping("/top5-quantity")
    public List<Top5QuantityView> getTop5Quantity() {
        return adminPageService.getTop5Quantity();
    }

    // top5 매출
    @GetMapping("/top5-revenue")
    public List<Top5RevenueView> getTop5Revenue() {
        return adminPageService.getTop5Revenue();
    }

    // 최근 7일
    @GetMapping("/weekly-sales")
    public List<DailySalesProjection> getWeeklySales() {
        return adminPageService.getLast7DaysSales();
    }

    @GetMapping("/detail/{bookId}")
    public ResponseEntity<AdminPageDetailResponse> getAdminBookDetail(@PathVariable Long bookId) {
        List<AdminPageDto> bookdata = adminPageService.findBookData(bookId);
        List<AdminPageDetailDto> bookdataDetail = adminPageService.findAdminBookDetail(bookId);

        return ResponseEntity.ok(
                new AdminPageDetailResponse(bookdata, bookdataDetail)
        );
    }


}
