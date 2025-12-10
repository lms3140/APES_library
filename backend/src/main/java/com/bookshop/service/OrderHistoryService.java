package com.bookshop.service;

import com.bookshop.dto.OrderHistoryDto;

import java.util.List;

public interface OrderHistoryService {
    List<OrderHistoryDto> getOrderHistoryList();
    void deleteOrderHistory(Long orderId);
}
