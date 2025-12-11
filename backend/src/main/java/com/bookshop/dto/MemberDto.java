package com.bookshop.dto;

import com.bookshop.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;

@Data
public class MemberDto {

    private Long memberId;
    private String userId;
    private String currentPwd;
    private String pwd;
    private String pwdCheck;
    private String name;
    private String phone;
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;

    private String gender;
    private String role;
    private Integer pointBalance;
    private Integer changePoint;

    // JWT Token을 위한 추가 필드
    private String jwtToken;

    public MemberDto() {}
    public MemberDto(Member entity) {
        this.memberId = entity.getMemberId();
        this.userId = entity.getUserId();
        this.pwd = entity.getPwd();
        this.name = entity.getName();
        this.phone = entity.getPhone();
        this.email = entity.getEmail();
        this.birth = entity.getBirth();
        this.gender = entity.getGender();
        this.role = entity.getRole();
        this.pointBalance = entity.getPointBalance();
        this.changePoint = 0;
    }
}
