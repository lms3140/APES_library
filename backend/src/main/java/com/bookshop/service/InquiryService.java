package com.bookshop.service;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;

import java.util.List;

public interface InquiryService {
    Inquiry registerQna(InquiryDto dto);
    List<Inquiry> getMyInquiries();
    int deleteInquiry(long inquiryId);
}
