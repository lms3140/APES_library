package com.bookshop.Controller;

import com.bookshop.dto.CollectionResponseDto;
import com.bookshop.service.BookCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/BookCollection")
@RequiredArgsConstructor
public class BookCollectionController {

    private final BookCollectionService bookCollectionService;

    @GetMapping("/all")
    public List<CollectionResponseDto> getBookCollection(){
        return bookCollectionService.getCollections();
    }
}
