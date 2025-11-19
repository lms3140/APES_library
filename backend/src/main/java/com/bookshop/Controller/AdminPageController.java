package com.bookshop.Controller;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.service.AdminPageService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<AdminPageDto> getSearchBooks(@@RequestParam String type, @RequestParam String keyword) {
        return adminPageService.searchBooks(type, keyword);
    }

    @GetMapping("/{id}")
    public AdminPageDto getBookDetail(@PathVariable Long id) {
        return adminPageService.findBookDetail(id);
    }


}
