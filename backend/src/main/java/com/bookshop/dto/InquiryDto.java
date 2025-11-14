package com.bookshop.dto;

import com.bookshop.entity.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class InquiryDto {
    private long inquiryId;
    private long memberId;
    private String title;
    private String content;
    private String status;
    private long answeredBy;
    private LocalDateTime answeredAt;
    private Date createdAt;
    private Date updatedAt;

}
