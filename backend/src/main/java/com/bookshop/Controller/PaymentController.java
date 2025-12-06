package com.bookshop.Controller;

import com.bookshop.dto.KakaoPayApproveDto;
import com.bookshop.dto.KakaoPayApproveResponseDto;
import com.bookshop.dto.KakaoPayReadyResponseDto;
import com.bookshop.dto.PaymentReadyRequestDto;
import com.bookshop.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/ready")
    public KakaoPayReadyResponseDto ready(@RequestBody PaymentReadyRequestDto dto) {
        return paymentService.ready(dto);
    }

    @PostMapping("/approve")
    public KakaoPayApproveResponseDto approve(@RequestBody KakaoPayApproveDto dto) {
        return paymentService.approve(dto.getOrderId(), dto.getPgToken());
    }
}