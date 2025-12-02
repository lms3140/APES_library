package com.bookshop.service;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Address;
import com.bookshop.entity.Member;
import com.bookshop.repository.AddressRepository;
import com.bookshop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressRepository addressRepository;
    private final MemberRepository memberRepository;

    @Override
    public Address createAddress(AddressDto dto){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));

        Address address = new Address();
        address.setMember(member);  // 🔥 반드시 필요!
        address.setPhone(dto.getPhone());
        address.setRecipientName(dto.getRecipientName());
        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setZipCode(dto.getZipCode());

        return addressRepository.save(address);

    }
}
