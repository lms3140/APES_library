package com.bookshop.client;

import com.bookshop.dto.KakaoPayApproveRequestDto;
import com.bookshop.dto.KakaoPayApproveResponseDto;
import com.bookshop.dto.KakaoPayReadyRequestDto;
import com.bookshop.dto.KakaoPayReadyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import org.springframework.web.client.RestTemplate;


@Component
@RequiredArgsConstructor
public class KakaoPayClient {

    @Value("${kakaopay.host}")
    private String host;

    @Value("${kakaopay.secret-key}")
    private String secretKey;

    public KakaoPayReadyResponseDto ready(KakaoPayReadyRequestDto req) {

        String url = host + "/online/v1/payment/ready";

        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "SECRET_KEY " + secretKey);

        HttpEntity<KakaoPayReadyRequestDto> request = new HttpEntity<>(req, headers);

        ResponseEntity<KakaoPayReadyResponseDto> response =
                rt.postForEntity(url, request, KakaoPayReadyResponseDto.class);

        return response.getBody();
    }

    public KakaoPayApproveResponseDto approve(KakaoPayApproveRequestDto req) {

        String url = host + "/online/v1/payment/approve";

        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "SECRET_KEY " + secretKey);

        HttpEntity<KakaoPayApproveRequestDto> request =
                new HttpEntity<>(req, headers);

        ResponseEntity<KakaoPayApproveResponseDto> response =
                rt.postForEntity(url, request, KakaoPayApproveResponseDto.class);

        return response.getBody();
    }
}