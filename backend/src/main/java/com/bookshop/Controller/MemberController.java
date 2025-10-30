package com.bookshop.Controller;

import com.bookshop.dto.Member;
import com.bookshop.service.MemberService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController (MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/idcheck")
    public String idcheck(@RequestBody Member member) {

        return "";
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody Member member) {

        return false;
    }

    @PostMapping("/login")
    public int login() {

        return 0;
    }

}
