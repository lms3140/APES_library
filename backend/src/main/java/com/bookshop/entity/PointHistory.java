package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class PointHistory extends BaseCreatedEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointHistoryId;

    private Integer changeAmount;
    private String type;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}