package com.bookshop.service;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;

public interface InquiryService {
    public Inquiry registerQna(InquiryDto inquiryDto);
}
