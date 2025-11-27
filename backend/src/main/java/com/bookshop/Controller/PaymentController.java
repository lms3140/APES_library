package com.bookshop.Controller;

import com.bookshop.dto.KakaoPayApproveResponseDto;
import com.bookshop.dto.KakaoPayReadyResponseDto;
import com.bookshop.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/ready")
    public KakaoPayReadyResponseDto ready(@RequestParam String orderId,
                                          @RequestParam String userId) {
        return paymentService.ready(orderId, userId);
    }

    @PostMapping("/approve")
    public KakaoPayApproveResponseDto approve(@RequestParam String orderId,
                                              @RequestParam String userId,
                                              @RequestParam("pg_token") String pgToken) {
        return paymentService.approve(orderId, userId, pgToken);
    }
}