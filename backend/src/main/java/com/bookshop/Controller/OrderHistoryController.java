package com.bookshop.Controller;

import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.service.OrderHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.fasterxml.jackson.databind.type.LogicalType.Map;

@RestController
@RequestMapping("/order-history")
@RequiredArgsConstructor
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    @GetMapping("/get")
    public List<OrderHistoryDto> getOrderHistoryList(){
        return orderHistoryService.getOrderHistoryList();
    }

    @PostMapping("/delete/{orderId}")
    public ResponseEntity<?> deleteOrderHistory(@PathVariable Long orderId) {
        orderHistoryService.deleteOrderHistory(orderId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "deleted");

        return ResponseEntity.ok(response);
    }
}
