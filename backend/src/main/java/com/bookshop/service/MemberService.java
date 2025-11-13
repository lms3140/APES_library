package com.bookshop.service;

import com.bookshop.dto.MemberDto;

public interface MemberService {
    boolean login(MemberDto memberDto);
    boolean signup(MemberDto memberDto);
    boolean idCheck(String userId);
    Long memberCheck(String userId);
}
