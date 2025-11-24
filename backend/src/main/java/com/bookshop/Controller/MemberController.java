package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ===== 로그인 =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto memberDto,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        String token = memberService.login(memberDto, request, response);
        if (token == null) {
            return ResponseEntity.ok(Map.of("login", false));
        }

        // 로그인 성공 시 반환할 데이터
        return ResponseEntity.ok(Map.of(
                "login", true,
                "token", token,
                "userId", memberDto.getUserId()
        ));
    }

    // ===== 로그아웃 =====
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        memberService.logout(request, response);
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

    // ===== 로그인 상태 확인 =====
    @GetMapping("/status")
    public ResponseEntity<?> loginStatus(HttpServletRequest request) {
        Long memberId = memberService.getCurrentMemberId(request);
        boolean isLogin = memberId != null;
        return ResponseEntity.ok(Map.of("login", isLogin));
    }

    // ===== 회원 체크 =====
    @PostMapping("/memberCheck")
    public ResponseEntity<?> memberCheck(@RequestBody MemberDto memberDto) {
        Long result = memberService.memberCheck(memberDto.getUserId());
        return ResponseEntity.ok(Map.of("memberId", result));
    }
}
