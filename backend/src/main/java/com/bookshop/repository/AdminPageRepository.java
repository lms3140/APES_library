package com.bookshop.repository;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.AdminPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminPageRepository extends JpaRepository<AdminPage, Long> {
    @Query(value = """
            select a
            from AdminPage a
            where a.bookId = :bookId
            """)
    AdminPage findByBookId(@Param("bookId") Long bookId);
}
