package com.bookshop.entity.Admin;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Getter
@Table(name = "admin_summary_view")
public class AdminPageSummary {

    @Id
    private Long totalBookCount; // PK 대용

    private Integer totalRevenue;
    private Integer totalQuantity;
    private Integer soldBookCount;
}