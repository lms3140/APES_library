package com.bookshop.service;

import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PointServiceImpl implements PointService{
    public final MemberRepository memberRepository;

    public PointServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public int addPoint(String userId, int point) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("회원 정보 없음"));
        member.setPointBalance(member.getPointBalance() + point);
        memberRepository.save(member);
        int result = member.getPointBalance();

        return result;
    }

    @Override
    public int reducePoint(String userId, int point) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("회원 정보 없음"));
        if(member.getPointBalance() < point) {
            throw new RuntimeException("포인트가 부족합니다.");
        } else {
            member.setPointBalance(member.getPointBalance() - point);
        }
        memberRepository.save(member);
        int result = member.getPointBalance();

        return result;
    }
}
