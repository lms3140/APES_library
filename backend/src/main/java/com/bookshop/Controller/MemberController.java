package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public boolean login(@RequestBody MemberDto memberDto) {
        boolean result = false;
        return result;
    }

    @PostMapping("/logout")
    public boolean logout(@RequestBody MemberDto memberDto) {
        boolean result = false;
        return result;
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody MemberDto memberDto) {
        boolean result = false;
        boolean chk = memberService.signup(memberDto);
        if(chk) result = true;
        System.out.println(chk);
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

}
