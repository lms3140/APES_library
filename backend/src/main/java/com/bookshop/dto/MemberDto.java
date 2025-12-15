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

    private String jwtToken; // JWT 토큰
    private String kakaoAccessToken; // 카카오 access token
    private String kakaoId;  // 카카오 고유 ID

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
        this.kakaoId = entity.getKakaoId();
    }

    public MemberDto(Member entity, String jwtToken, String kakaoAccessToken) {
        this(entity);
        this.jwtToken = jwtToken;
        this.kakaoAccessToken = kakaoAccessToken;
    }
}
