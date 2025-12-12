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

    @Column(name = "password")
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

    // 카카오 고유 ID 저장 (String 타입)
    @Column(unique = true)
    private String kakaoId;

    // 일반 회원가입용 생성자
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
        this.kakaoId = dto.getKakaoId();
    }

    /**
     * 카카오 로그인 최초 가입용 팩토리 메서드
     */
    public static Member createKakaoMember(String kakaoId) {
        Member m = new Member();

        m.kakaoId = kakaoId;
        m.userId = "kakao_" + kakaoId;   // 아이디 충돌 방지
        m.pwd = null;                    // 소셜 회원은 패스워드 없음

        // 기본값 채움
        m.name = "카카오사용자";
        m.phone = "000-0000-0000";
        m.email = "kakao_" + kakaoId + "@kakao.com";

        m.role = "USER";
        m.pointBalance = 0;

        return m;
    }
}
