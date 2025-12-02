package com.bookshop.entity;

import com.bookshop.dto.InquiryDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Inquiry extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;
    private String title;
    private String content;
    private String status;
    private Long answeredBy;
    private LocalDateTime answeredAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Inquiry() {}
    public Inquiry(InquiryDto dto) {

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.status = dto.getStatus();
        this.answeredBy = dto.getAnsweredBy();
        this.answeredAt = dto.getAnsweredAt();
    }
}