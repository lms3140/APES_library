package com.bookshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

// BaseCreatedEntity.java
@MappedSuperclass
@Getter
public abstract class BaseCreatedEntity {

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}