package com.bookshop.Controller;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;
import com.bookshop.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {
    private final InquiryService inquiryService;

    @PostMapping("/qna")
    public Inquiry getQna(@RequestBody InquiryDto inquiryDto) {
        return inquiryService.registerQna(inquiryDto);
    }

}
