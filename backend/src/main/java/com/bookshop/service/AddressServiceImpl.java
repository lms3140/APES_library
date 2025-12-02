package com.bookshop.service;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Address;
import com.bookshop.entity.Member;
import com.bookshop.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressRepository addressRepository;

    @Override
    public Address createAddress(Member member, AddressDto dto){
        Address address = Address.builder()
                .member(member)
                .recipientName(dto.getRecipientName())
                .phone(dto.getPhone())
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .zipCode(dto.getZipCode())
                .build();

        return addressRepository.save(address);
    }
}
