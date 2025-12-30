package com.bookshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "member_history")
// 회원 정보에서 수정 이력 출력 및 자장 용
public class MemberHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String type; // STATUS / POINT
    private String beforeValue;
    private String afterValue;
    private String reason;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
