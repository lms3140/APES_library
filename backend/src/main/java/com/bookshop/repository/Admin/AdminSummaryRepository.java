package com.bookshop.repository.Admin;

import com.bookshop.entity.Admin.AdminPageSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminSummaryRepository extends JpaRepository<AdminPageSummary, Long> {
    @Query("select a from AdminPageSummary a")
    List<AdminPageSummary> findSummary();
}