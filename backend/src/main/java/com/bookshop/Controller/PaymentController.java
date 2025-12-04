package com.bookshop.Controller;

import com.bookshop.dto.KakaoPayApproveResponseDto;
import com.bookshop.dto.KakaoPayReadyResponseDto;
import com.bookshop.dto.PaymentReadyRequestDto;
import com.bookshop.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public KakaoPayApproveResponseDto approve(@RequestBody String orderId,
//                                              @RequestBody String userId,
                                              @RequestParam("pg_token") String pgToken) {
        return paymentService.approve(orderId, pgToken);
    }
}