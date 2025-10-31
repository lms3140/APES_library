package com.bookshop.repository;

import com.bookshop.dto.Member;

public interface MemberRepository {
    String login(String id);
    int save(Member member);
    Long findById(String id);
}
