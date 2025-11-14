package com.bookshop.service;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;
import com.bookshop.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService{

    private final InquiryRepository inquiryRepository;

    public Inquiry registerQna(InquiryDto inquiryDto) {
        return inquiryRepository.save(new Inquiry(inquiryDto));
    }
}
