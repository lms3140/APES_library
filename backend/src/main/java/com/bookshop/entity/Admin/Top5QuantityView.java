package com.bookshop.entity.Admin;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;
import lombok.Getter;

@Entity
@Immutable
@Getter
@Table(name = "top5_quantity_view")
public class Top5QuantityView {

    @Id
    private Long bookId;

    private String title;
    private String imageUrl;
    private Integer totalQuantity;
}