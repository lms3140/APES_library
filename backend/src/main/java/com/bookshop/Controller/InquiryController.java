package com.bookshop.Controller;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;
import com.bookshop.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {
    private final InquiryService inquiryService;

    @PostMapping("/qna")
    public Inquiry getQna(@RequestBody InquiryDto dto) {
        return inquiryService.registerQna(dto);
    }

    @GetMapping("/member")
    public List<Inquiry> getMyInquiries() {
        return inquiryService.getMyInquiries();
    }

    @PostMapping("/delete")
    public int delete(@RequestBody InquiryDto dto) {
        return inquiryService.deleteInquiry(dto.getInquiryId());
    }

}
