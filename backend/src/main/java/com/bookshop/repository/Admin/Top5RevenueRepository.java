package com.bookshop.repository.Admin;

import com.bookshop.entity.Admin.Top5RevenueView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Top5RevenueRepository extends JpaRepository<Top5RevenueView, Long> {
}