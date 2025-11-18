package com.bookshop.repository;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminPageRepository extends JpaRepository<AdminPage, Long> {
    @Query(value = """
            select new com.bookshop.dto.AdminPageDto(a)
            from AdminPage a
            """)
    List<AdminPageDto> findAllBooks();
}
