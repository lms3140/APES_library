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

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public AddressDto getAddress(long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(()->new RuntimeException("모야"));
        AddressDto dto = new AddressDto(address);
        return dto;
    }

    @Override
    public List<AddressDto> getAddressList() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        // userId로 해당 회원의 주소 리스트를 가져옴
        List<Address> addresses = addressRepository.findByMemberUserId(userId);

        // Address를 AddressDto로 변환하여 반환
        return addresses.stream()
                .map(address -> new AddressDto(
                        address.getRecipientName(),
                        address.getPhone(),
                        address.getAddressLine1(),
                        address.getAddressLine2(),
                        address.getZipCode()
                ))
                .collect(Collectors.toList());
    }
}
