package com.bookshop.repository;

import com.bookshop.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByMemberMemberIdOrderByCreatedAtDesc(Long memberId);
    List<PurchaseOrder> findByMemberMemberIdAndDeletedFalseOrderByCreatedAtDesc(Long memberId);
    List<PurchaseOrder> findAllByDeletedFalseOrderByCreatedAtDesc();

}
