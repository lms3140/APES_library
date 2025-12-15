package com.bookshop.Controller;

import com.bookshop.dto.PublisherDto;
import com.bookshop.service.publisher.PublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/publisher")
@RequiredArgsConstructor
public class PublisherController {

    private final PublisherService publisherService;

    @GetMapping("/list")
    public List<PublisherDto> getPublisherList(){
        return publisherService.getPublisherList();
    }

}
