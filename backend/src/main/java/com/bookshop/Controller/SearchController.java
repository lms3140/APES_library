package com.bookshop.Controller;

import com.bookshop.dto.InquiryDto;
import com.bookshop.dto.SearchDto;
import com.bookshop.entity.Book;
import com.bookshop.service.InquiryService;
import com.bookshop.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/search")
    public List<SearchDto> search(@RequestParam String keyword) {
        return searchService.search(keyword).stream()
                .map(SearchDto::new)
                .toList();
    }
}
