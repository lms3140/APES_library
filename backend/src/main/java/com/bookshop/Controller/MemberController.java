package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // React Vite
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ===== 로그인 =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto member,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        boolean result = memberService.login(member, request, response);
        if (result) {
            // XSRF 토큰 초기화
            Cookie xsrf = new Cookie("XSRF-TOKEN", null);
            xsrf.setPath("/");
            xsrf.setMaxAge(0);
            xsrf.setHttpOnly(false);
            response.addCookie(xsrf);

            return ResponseEntity.ok(Map.of(
                    "login", true,
                    "userId", member.getUserId()
            ));
        } else {
            return ResponseEntity.ok(Map.of("login", false));
        }
    }

    // ===== 로그아웃 =====
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        memberService.logout(request, response);

        // CSRF 토큰 초기화
        Cookie xsrf = new Cookie("XSRF-TOKEN", null);
        xsrf.setPath("/");
        xsrf.setMaxAge(0);
        xsrf.setHttpOnly(false);
        response.addCookie(xsrf);

        return ResponseEntity.ok(Map.of("logout", true));
    }

    // ===== 회원가입 =====
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody MemberDto memberDto) {
        boolean result = memberService.signup(memberDto);
        return ResponseEntity.ok(Map.of("signup", result));
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
