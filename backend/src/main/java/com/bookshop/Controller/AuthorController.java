package com.bookshop.Controller;

import com.bookshop.dto.author.AuthorRespDto;
import com.bookshop.service.author.AuthorService;
import com.bookshop.service.author.AuthorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/author")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping("/list")
    public List<AuthorRespDto> getAuthorList(){

        return authorService.getList();
    }
}
