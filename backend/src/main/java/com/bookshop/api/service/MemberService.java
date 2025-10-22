package com.bookshop.api.service;

public interface MemberService {
    boolean login(Member member);
    int signup(Member member);
    boolean idCheck(String id);
}
