package com.bookshop.repository;

import com.bookshop.entity.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory,Long> {
    public List<Subcategory> findByCategoryCategoryId(Long categoryId);
}
