package com.bookshop.Controller;

import com.bookshop.dto.AdminPageDetailDto;
import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPageDetailResponse;
import com.bookshop.service.AdminPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminPage")
public class AdminPageController {
    private final AdminPageService adminPageService;

    @Autowired
    public AdminPageController (AdminPageService adminPageService) {
        this.adminPageService = adminPageService;
    }

    @GetMapping
    public List<AdminPageDto> getAdminPage() {
        List<AdminPageDto> result = adminPageService.findAllBooks();
        return result;
    }

    @GetMapping("/search")
    public List<AdminPageDto> getSearchBooks(@RequestParam String searchType, @RequestParam String keyword) {
        return adminPageService.searchBooks(searchType, keyword);
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
