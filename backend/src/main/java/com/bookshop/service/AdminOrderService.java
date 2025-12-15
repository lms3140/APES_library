package com.bookshop.service;

import com.bookshop.dto.OrderDetailDto;
import com.bookshop.dto.OrderHistoryDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface AdminOrderService {
    List<OrderHistoryDto> getAllOrders();
    OrderDetailDto getOrderDetail(Long orderId);
    void updateOrderStatus(Long orderId, String status);
}
