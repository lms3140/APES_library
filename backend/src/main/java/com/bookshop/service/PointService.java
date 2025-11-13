package com.bookshop.service;

import com.bookshop.dto.MemberDto;

public interface PointService {
    int addPoint(String userId, int point);
    int reducePoint(String userId, int point);
}
