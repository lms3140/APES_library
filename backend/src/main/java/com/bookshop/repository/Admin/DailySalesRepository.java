package com.bookshop.repository.Admin;

import com.bookshop.entity.PurchaseOrder;
import com.bookshop.repository.projection.DailySalesProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailySalesRepository extends JpaRepository<PurchaseOrder, Long> {

    @Query(
            value = """
            WITH RECURSIVE dates AS (
                SELECT CURDATE() AS d
                UNION ALL
                SELECT DATE_SUB(d, INTERVAL 1 DAY)
                FROM dates
                WHERE d > DATE_SUB(CURDATE(), INTERVAL 6 DAY)
            )
            SELECT 
                DATE_FORMAT(dates.d, '%Y-%m-%d') AS date,
                IFNULL(SUM(od.quantity), 0) AS quantity
            FROM dates
            LEFT JOIN purchase_order po 
                ON DATE(po.paid_at) = dates.d 
                AND po.order_status = 'PAID'
            LEFT JOIN order_detail od 
                ON po.order_id = od.order_id
            GROUP BY dates.d
            ORDER BY dates.d;
        """,
            nativeQuery = true
    )
    List<DailySalesProjection> getLast7DaysSales();
}
