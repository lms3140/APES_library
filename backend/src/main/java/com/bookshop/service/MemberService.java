package com.bookshop.service;

import com.bookshop.dto.MemberDto;

public interface MemberService {
    boolean login(MemberDto member);
    boolean signup(MemberDto member);
    boolean idCheck(String id);
}
