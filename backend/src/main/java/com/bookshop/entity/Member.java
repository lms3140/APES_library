package com.bookshop.entity;

import com.bookshop.dto.MemberDto;
import jakarta.persistence.*;
import lombok.Data;
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

    @Column(unique = true, nullable = false)
    private String userId;

    @Column(name = "password", nullable = false)
    private String pwd;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    private LocalDate birth;
    private String gender;
    private String role = "USER";

    @Column(name = "point_balance")
    private Integer pointBalance = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime deletedAt;

    public Member(MemberDto dto) {
        this.userId = dto.getUserId();
        this.pwd = dto.getPwd();
        this.name = dto.getName();
        this.phone = dto.getPhone();
        this.email = dto.getEmail();
        this.birth = dto.getBirth();
        this.gender = dto.getGender();
        this.role = dto.getRole() != null ? dto.getRole() : "USER";
        this.pointBalance = dto.getPointBalance() != null ? dto.getPointBalance() : 0;
    }
}
