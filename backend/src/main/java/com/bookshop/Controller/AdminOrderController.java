package com.bookshop.Controller;

import com.bookshop.dto.OrderDetailDto;
import com.bookshop.dto.OrderHistoryDto;
import com.bookshop.service.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {
    private final AdminOrderService adminOrderService;

    @GetMapping("/list")
    public List<OrderHistoryDto> getAllOrders() {
        return adminOrderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public OrderDetailDto getOrderDetail(@PathVariable Long orderId) {
        return adminOrderService.getOrderDetail(orderId);
    }

    @PatchMapping("/{orderId}/status")
    public String updateOrderStatus(@PathVariable Long orderId,
                                    @RequestParam String status) {
        adminOrderService.updateOrderStatus(orderId, status);
        return "updated";
    }
}
