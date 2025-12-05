package com.bookshop.Controller;

import com.bookshop.dto.CollectionResponseDto;
import com.bookshop.service.BookCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/book-collection")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class    BookCollectionController {

    private final BookCollectionService bookCollectionService;

    @GetMapping("/all")
    public List<CollectionResponseDto> getBookCollection(){
        return bookCollectionService.getCollections();
    }
}