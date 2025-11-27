package com.bookshop.repository;

import com.bookshop.entity.OrderDetail;
import com.bookshop.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
