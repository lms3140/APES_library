package com.bookshop.service.author;

import com.bookshop.dto.author.AuthorRespDto;
import com.bookshop.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public List<AuthorRespDto> getList(){

        return authorRepository.findAll()
                .stream().map(AuthorRespDto::new).toList();
    }
}
