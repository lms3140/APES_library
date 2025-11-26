package com.bookshop.service;

import com.bookshop.client.KakaoPayClient;
import com.bookshop.dto.KakaoPayApproveRequestDto;
import com.bookshop.dto.KakaoPayApproveResponseDto;
import com.bookshop.dto.KakaoPayReadyRequestDto;
import com.bookshop.dto.KakaoPayReadyResponseDto;
import com.bookshop.storage.TidStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final KakaoPayClient kakaoPayClient;
    private final TidStorage tidStorage;

    @Value("${kakaopay.cid}")
    private String cid;

    private final String FRONT = "http://localhost:5173";

    public KakaoPayReadyResponseDto ready(String orderId, String userId) {

        KakaoPayReadyRequestDto req = new KakaoPayReadyRequestDto();
        req.setCid(cid);
        req.setPartner_order_id(orderId);
        req.setPartner_user_id(userId);
        req.setItem_name("테스트 상품");
        req.setQuantity(1);
        req.setTotal_amount(500000);
        req.setTax_free_amount(0);
        req.setApproval_url(FRONT + "/payment/success");
        req.setCancel_url(FRONT + "/payment/cancel");
        req.setFail_url(FRONT + "/payment/fail");
        KakaoPayReadyResponseDto response = kakaoPayClient.ready(req);
        tidStorage.save(orderId, response.getTid());
        return response;
    }

    // 실서비스라면 tid를 DB에 저장해야 함
    // 지금은 DB 사용 안 하므로 tid를 프론트에서 전달받는 방식
    public KakaoPayApproveResponseDto approve(
                                           String orderId,
                                           String userId,
                                           String pgToken) {
// Redis에서 tid 가져오기
        String tid = tidStorage.get(orderId);
        if (tid == null) {
            throw new IllegalStateException("tid expired or missing: " + orderId);
        }

        KakaoPayApproveRequestDto req = new KakaoPayApproveRequestDto();
        req.setCid(cid);
        req.setTid(tid);
        req.setPartner_order_id(orderId);
        req.setPartner_user_id(userId);
        req.setPg_token(pgToken);
        KakaoPayApproveResponseDto response = kakaoPayClient.approve(req);
        tidStorage.remove(orderId);

        return response;
    }
}