package com.bookshop.dto;

import com.bookshop.entity.Member;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberDto {
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

    public MemberDto() {}
    public MemberDto(Member entity) {
        this.memberId = entity.getMemberId();
        this.userId = entity.getUserId();
        this.password = entity.getPassword();
        this.name = entity.getName();
        this.phone = entity.getPhone();
        this.email = entity.getEmail();
        this.birth = entity.getBirth();
        this.gender = entity.getGender();
        this.role = entity.getRole();
        this.pointBalance = entity.getPointBalance();
    }
}
