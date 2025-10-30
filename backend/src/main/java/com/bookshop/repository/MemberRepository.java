package com.bookshop.repository;

public interface MemberRepository {
    String login(String id);
    Long findById(String id);
}
