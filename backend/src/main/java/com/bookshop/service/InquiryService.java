package com.bookshop.service;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;

import java.util.List;

public interface InquiryService {
    public Inquiry registerQna(InquiryDto dto);
    public List<Inquiry> getMyInquiries();
}
