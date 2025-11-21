package com.bookshop.Controller; // 소문자 패키지 권장

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:5173") // React Vite
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ===== 회원가입 =====
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody MemberDto memberDto) {
        boolean result = memberService.signup(memberDto);
        return ResponseEntity.ok(Map.of("signup", result));
    }

    // ===== 로그인 =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto memberDto,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {

        boolean result = memberService.login(memberDto, request, response);
        return ResponseEntity.ok(Map.of(
                "login", result,
                "userId", memberDto.getUserId()
        ));
    }

    // ===== 로그아웃 =====
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        memberService.logout(request, response);
        return ResponseEntity.ok(Map.of("logout", true));
    }

    // ===== 아이디 중복 체크 =====
    @PostMapping("/idCheck")
    public ResponseEntity<?> idCheck(@RequestBody Map<String, String> param) {
        String userId = param.get("userId");
        boolean exists = memberService.idCheck(userId);
        String msg = exists ? "이미 사용중인 아이디입니다." : "사용 가능한 아이디입니다.";
        return ResponseEntity.ok(Map.of("message", msg));
    }
}
