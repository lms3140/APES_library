package com.bookshop.service;

import com.bookshop.dto.InquiryDto;
import com.bookshop.entity.Inquiry;
import com.bookshop.entity.Member;
import com.bookshop.repository.InquiryRepository;
import com.bookshop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService{

    private final InquiryRepository inquiryRepository;
    private final MemberRepository memberRepository;

    @Override
    public Inquiry registerQna(InquiryDto dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원"));
        Inquiry inquiry = new Inquiry(dto);
        inquiry.setMember(member);

        return inquiryRepository.save(inquiry);
    }

    @Override
    public List<Inquiry> getMyInquiries() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));

        return inquiryRepository.findByMember(member);
    }

    @Override
    public int deleteInquiry(long inquiryId) {
        inquiryRepository.deleteById(inquiryId);
        return 1;
    }
}
