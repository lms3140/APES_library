package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

//로그인, 로그아웃, 회원가입, 아이디 중복체크, 멤버아이디(계정 고유 id) 조회

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
    private final HttpSessionSecurityContextRepository httpSessionSecurityContextRepository;

    @Autowired
    public MemberController(MemberService memberService, AuthenticationManager authenticationManager, HttpSessionSecurityContextRepository httpSessionSecurityContextRepository) {
        this.memberService = memberService;
        this.authenticationManager = authenticationManager;
        this.httpSessionSecurityContextRepository = httpSessionSecurityContextRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto memberDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(memberDto.getUserId(), memberDto.getPassword());

            Authentication authenticationResponse =
                    this.authenticationManager.authenticate(authenticationRequest);
            System.out.println("인증 성공: "+authenticationResponse.getPrincipal());

            var context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationResponse);
            SecurityContextHolder.setContext(context);

            httpSessionSecurityContextRepository.saveContext(context, request, response);

            var xsrf = new Cookie("XSRF-TOKEN", null);
            xsrf.setPath("/");
            xsrf.setMaxAge(0);
            xsrf.setHttpOnly(false);
            response.addCookie(xsrf);

            return ResponseEntity.ok(Map.of("login", true, "userId", memberDto.getUserId()));
        } catch(Exception e) {
            return ResponseEntity.ok(Map.of("login", false));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        var cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        var xsrf = new Cookie("XSRF-TOKEN", null);
        xsrf.setPath("/");
        xsrf.setMaxAge(0);
        xsrf.setHttpOnly(false);
        response.addCookie(xsrf);

        return ResponseEntity.ok(Map.of("logout", true));
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody MemberDto memberDto) {
        boolean result = memberService.signup(memberDto);
        System.out.println(result);
        return result;
    }

    @PostMapping("/idCheck")
    public String idCheck(@RequestBody MemberDto memberDto) {
        boolean result = memberService.idCheck(memberDto.getUserId());
        String msg = "";
        if(result) msg = "이미 사용중인 아이디 입니다.";
        else msg = "사용이 가능한 아이디 입니다.";
        return msg;
    }

    @PostMapping("/memberCheck")
    public Long memberCheck(@RequestBody MemberDto memberDto) {
        Long result = memberService.memberCheck(memberDto.getUserId());

        return result;
    }


}
