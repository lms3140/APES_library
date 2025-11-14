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

        System.out.println("데이터가 잘 나오나요?" + inquiryDto);
        System.out.println(inquiryDto.getMemberId());
        return inquiryService.registerQna(inquiryDto);
    }

}
