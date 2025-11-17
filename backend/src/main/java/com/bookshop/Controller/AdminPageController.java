package com.bookshop.Controller;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.service.AdminPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminPageController {
    private final AdminPageService adminPageService;

    @Autowired
    public AdminPageController (AdminPageService adminPageService) {
        this.adminPageService = adminPageService;
    }

    @GetMapping("/adminPage")
    public List<AdminPageDto> getAdminPage() {
        List<AdminPageDto> result = adminPageService.findAllBooks();
        return result;
    }

}
