package com.bookshop.repository;

import com.bookshop.entity.Member;
import com.bookshop.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
}
