package com.bookshop.service;

import com.bookshop.dto.Member;

public interface MemberService {
    boolean login(Member member);
    int signup(Member member);
    boolean idCheck(String id);
}
