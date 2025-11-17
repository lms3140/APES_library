package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "book_sales_view")
public class AdminPage {
    @Id
    private Long bookId;
    private String title;
    private String image_url;
    private Integer totalSalesQuantity;
    private Integer totalPrice;
    private String userId;
}
