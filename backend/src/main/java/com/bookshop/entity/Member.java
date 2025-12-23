package com.bookshop.entity;

import com.bookshop.dto.MemberDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    // 로그인 ID
    @Column(unique = true, nullable = false)
    private String userId;

    // 비밀번호
    @Column(nullable = false)
    private String pwd;

    // 기본 회원 정보
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    private LocalDate birth;
    private String gender;

    // USER / ADMIN
    @Column(nullable = false)
    private String role = "USER";

    // ACTIVE / BLOCK / WITHDRAW
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus status = MemberStatus.ACTIVE;

    @Column(length = 255)
    private String blockReason;

    // 포인트
    @Column(name = "point_balance")
    private Integer pointBalance = 0;

    // 가입일
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // 탈퇴일 (소프트 삭제)
    private LocalDateTime deletedAt;

    // 카카오 로그인용 ID
    @Column(unique = true)
    private String kakaoId;

    // ===== 일반 회원가입 생성자 =====
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
        this.status = MemberStatus.ACTIVE;
        this.kakaoId = dto.getKakaoId();
    }

    /**
     * 카카오 최초 가입용 팩토리 메서드
     */
    public static Member createKakaoMember(String kakaoId) {
        Member m = new Member();
        m.kakaoId = kakaoId;
        m.userId = "kakao_" + kakaoId;

        // 비밀번호는 서비스에서 암호화
        m.pwd = "kakao_" + kakaoId;

        m.name = "카카오사용자";
        m.phone = "000-0000-0000";
        m.email = "kakao_" + kakaoId + "@kakao.com";

        m.role = "USER";
        m.status = MemberStatus.ACTIVE;
        m.pointBalance = 0;

        return m;
    }
}
