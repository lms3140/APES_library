package com.bookshop.repository.Admin;

import com.bookshop.entity.Admin.Top5QuantityView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Top5QuantityRepository extends JpaRepository<Top5QuantityView, Long> {
}
