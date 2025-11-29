package com.bookshop.entity.Admin;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;
import lombok.Getter;
import jakarta.persistence.Column;

@Entity
@Immutable
@Getter
@Table(name = "top5_revenue_view")
public class Top5RevenueView {

    @Id
    private Long bookId;

    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    private Integer totalRevenue;
}