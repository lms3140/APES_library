package com.bookshop.Controller;

import com.bookshop.dto.Member;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController (MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/idcheck")
    public String idcheck(@RequestBody Member member) {
            boolean result = memberService.idCheck(member.getId());
            String msg = "";
            if(result) msg = "이미 사용중인 아이디입니다.";
            else msg = "아이디 사용가능";
        return msg;
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody Member member) {
        boolean result = false;
        int rows = memberService.signup(member);
        if(rows == 1) result = true;
        return result;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member member, HttpServletRequest request) {
        ResponseEntity<?> response = null;
        boolean result = memberService.login(member);

        if(result) {
            HttpSession session = request.getSession(true);
            session.setAttribute("sid", "test");
            response = ResponseEntity.ok(Map.of("login", true));
        } else {
            response = ResponseEntity.ok(Map.of("login", false));
        }
        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);

        if(session != null) {
            session.invalidate();
        }

        var cookie = new Cookie("JSEEIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        var xsrf = new Cookie("XSRF-TOKEN", null);
        xsrf.setPath("/");
        xsrf.setMaxAge(0);
        xsrf.setHttpOnly(true);
        response.addCookie(xsrf);

        return ResponseEntity.ok(Map.of("logout", true));
    }

}
