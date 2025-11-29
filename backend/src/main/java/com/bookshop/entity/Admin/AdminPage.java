package com.bookshop.entity.Admin;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "book_sales_stats_view")
@Data
public class AdminPage {

    @Id
    private Long bookId;
    private String title;
    private String imageUrl;
    private Integer totalSalesQuantity;
    private Integer totalSalesAmount;

}