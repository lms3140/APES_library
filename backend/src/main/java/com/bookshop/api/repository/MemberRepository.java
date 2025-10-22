package com.bookshop.api.repository;

public interface MemberRepository {
    String login(String id);
    int save(Member member);
    Long findById(String id);
}
