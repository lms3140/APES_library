package com.bookshop.service.publisher;

import com.bookshop.dto.PublisherDto;
import com.bookshop.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublisherService {

    private final PublisherRepository publisherRepository;

    public List<PublisherDto> getPublisherList(){
        return publisherRepository.findAll().stream().map(PublisherDto::new).toList();
    }

}
