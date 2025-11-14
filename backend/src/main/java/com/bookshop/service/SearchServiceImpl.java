package com.bookshop.service;

import com.bookshop.entity.Book;
import com.bookshop.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{
    private final SearchRepository searchRepository;

    @Override
    public List<Book> search(String keyword) {
        List<Book> titleList = searchRepository.findByTitleContaining(keyword);
        List<Book> authorList = searchRepository.findByAuthorName(keyword);

        Set<Book> merged = new LinkedHashSet<>();
        merged.addAll(titleList);
        merged.addAll(authorList);

        return new ArrayList<>(merged);
    }
}
