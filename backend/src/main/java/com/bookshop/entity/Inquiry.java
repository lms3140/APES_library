package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Inquiry extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;

    private String title;
    private String content;
    private String status;
    private Long answeredBy;
    private LocalDateTime answeredAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}