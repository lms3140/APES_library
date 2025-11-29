package com.bookshop.repository.Admin;

import com.bookshop.dto.AdminPageDto;
import com.bookshop.entity.Admin.AdminPage;
import com.bookshop.entity.Admin.AdminPageDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminPageRepository extends JpaRepository<AdminPage, Long> {
    @Query(value = """
            select new com.bookshop.dto.AdminPageDto(a)
                from AdminPage a
            """)
    List<AdminPageDto> findAllBooks();

    @Query("select a from AdminPage a where a.title like concat('%', :keyword, '%')")
    List<AdminPage> findByTitle(@Param("keyword") String keyword);

    @Query("select a from AdminPage a where a.bookId = :keyword")
    List<AdminPage> findByBookId(@Param("keyword") Long keyword);


    @Query("""
            SELECT apg from AdminPageDetail apg where apg.bookId = :bookId
            """)
    List<AdminPageDetail> findAdminBookDetail(@Param("bookId") Long bookId);
}
