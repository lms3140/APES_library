package com.bookshop.Controller;

import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.service.OrderHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order-history")
@RequiredArgsConstructor
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    @PostMapping("/get")
    public List<OrderHistoryDto> getOrderHistoryList(){
        return orderHistoryService.getOrderHistoryList();
    }
}
