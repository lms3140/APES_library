package com.bookshop.entity;

import com.bookshop.dto.MemberDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String userId;
    private String password;
    private String name;
    private String phone;
    private String email;
    private LocalDate birth;
    private String gender;
    private String role;
    private Integer pointBalance;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    public Member(MemberDto memberDto) {
        this.memberId = memberDto.getMemberId();
        this.userId = memberDto.getUserId();
        this.password = memberDto.getPassword();
        this.name = memberDto.getName();
        this.phone = memberDto.getPhone();
        this.email = memberDto.getEmail();
        this.birth = memberDto.getBirth();
        this.gender = memberDto.getGender();
        this.role = memberDto.getRole();
        this.pointBalance = memberDto.getPointBalance();
    }
}