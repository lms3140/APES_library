package com.bookshop.service;

import com.bookshop.client.KakaoPayClient;
import com.bookshop.dto.*;
import com.bookshop.entity.*;
import com.bookshop.repository.*;
import com.bookshop.storage.TidStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final KakaoPayClient kakaoPayClient;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final TidStorage tidStorage;

    @Value("${kakaopay.cid}")
    private String cid;

    private final String FRONT = "http://localhost:5173";

    public KakaoPayReadyResponseDto ready(PaymentReadyRequestDto paymentReadyRequestDto) {
        int totalAmount = 0;
        int totalQuantity = 0;
        int originalAmount = 0;
        int earnedPoint = 0;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        List<PayItemDto> bookList = paymentReadyRequestDto.getBooks();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()-> new RuntimeException("회원 찾는중 오류"));
        Address address = addressRepository.findById(paymentReadyRequestDto.getAddressId())
                .orElseThrow(()->new RuntimeException("주소 찾는중 오류"));
        if(member.getPointBalance() < paymentReadyRequestDto.getPoint()){
            throw new RuntimeException("오류");
        }

        PurchaseOrder purchaseOrder = new PurchaseOrder(member,address,totalAmount,originalAmount);
        PurchaseOrder resultOrder = purchaseOrderRepository.save(purchaseOrder);

        for(PayItemDto item: bookList){
            Book book = bookRepository.findById(item.getBookId())
                    .orElseThrow(()-> new RuntimeException("책을 찾지못했습니다."));
            int quantity = item.getQuantity();
            int price = book.getPrice();
            double perSale = 0.1;

            OrderDetail orderDetail = new OrderDetail(resultOrder,book,quantity,price);
            orderDetailRepository.save(orderDetail);
            int discountPrice = (int) Math.round(price * (1 - perSale));
            originalAmount += price * quantity;
            earnedPoint += (int) Math.ceil((price * quantity) * 0.1);
            totalAmount +=  discountPrice * quantity;
            totalQuantity += quantity;
        }

        resultOrder.setTotalAmount(totalAmount);
        resultOrder.setEarnedPoint(earnedPoint);
        KakaoPayReadyRequestDto req = new KakaoPayReadyRequestDto();

        req.setCid(cid);
        req.setPartner_order_id(String.valueOf(resultOrder.getOrderId())); // purchaseOrder 생성해서 때려넣기
        req.setPartner_user_id(member.getUserId());
        req.setItem_name(paymentReadyRequestDto.getItemName()); // body로 받아온 이름
        req.setQuantity(totalQuantity); // body로 받아온 갯수
        req.setTotal_amount(resultOrder.getTotalAmount()); // 계산된 총 가격
        req.setTax_free_amount(0); // 이 프로젝트에선 무조건 0임
        req.setApproval_url(FRONT + "/order/complete/"+resultOrder.getOrderId());
        req.setCancel_url(FRONT + "/payment/cancel");
        req.setFail_url(FRONT + "/payment/fail");


        KakaoPayReadyResponseDto response = kakaoPayClient.ready(req);
        resultOrder.setTid(response.getTid());
        response.setOrderId(resultOrder.getOrderId());
        purchaseOrderRepository.save(resultOrder);
        return response;
    }

    public KakaoPayApproveResponseDto approve(
                                           String orderId,
                                           String pgToken) {
        PurchaseOrder order = purchaseOrderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(()-> new RuntimeException("order 아이디를 찾지못했습니다."));
        if(order.getOrderStatus().equals("PAID")){
            throw new RuntimeException("이미 결제가 된 사항입니다.");
        }
        Member member = memberRepository.findByUserId(order.getMember().getUserId())
                .orElseThrow(()->new RuntimeException("유저못찾음"));

        KakaoPayApproveRequestDto req = new KakaoPayApproveRequestDto();
        req.setCid(cid);
        req.setTid(order.getTid());
        req.setPartner_order_id(orderId);
        req.setPartner_user_id(order.getMember().getUserId());
        req.setPg_token(pgToken);
        try{
            KakaoPayApproveResponseDto response = kakaoPayClient.approve(req);
            order.approve();
            member.setPointBalance(member.getPointBalance() + order.getEarnedPoint());
            purchaseOrderRepository.save(order);
            memberRepository.save(member);

            //총 결제 금액 추가
            response.setTotal_amount(order.getTotalAmount());
            response.setPartner_order_id(order.getOrderId().toString());

            return response;
        } catch (Exception e){
            order.error();
            purchaseOrderRepository.save(order);
            throw e;
        }
    }

    public String failed(String orderId){
        PurchaseOrder order = purchaseOrderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(()->new RuntimeException("order 아이디를 찾지못했습니다."));
        order.fail();
        purchaseOrderRepository.save(order);
        return "결제실패";
    }

    public String cancel(String orderId){
        PurchaseOrder order = purchaseOrderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(()->new RuntimeException("order 아이디를 찾지못했습니다."));
        order.cancel();
        purchaseOrderRepository.save(order);
        return "결제오류";
    }
}