package com.bookshop.service;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Address;
import com.bookshop.entity.Member;
import com.bookshop.repository.AddressRepository;
import com.bookshop.repository.MemberRepository;
import io.micrometer.observation.annotation.Observed;
import jakarta.transaction.Transactional;
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

    private Member getLoginMember() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        return memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));
    }

    @Override
    @Transactional
    public Address createAddress(AddressDto dto){
        Member member = getLoginMember();
        long memberId = member.getMemberId();

        if(dto.isDefault()) {
            List<Address> existing = addressRepository.findByMember_MemberId(memberId);
            existing.forEach(addr -> addr.setDefault(false));
        }

        boolean isFirstAddress = addressRepository
                .findByMember_MemberId(memberId)
                .isEmpty();

        Address address = Address.builder()
                .member(member)
                .recipientName(dto.getRecipientName())
                .phone(dto.getPhone())
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .zipCode(dto.getZipCode())
                .addressName(dto.getAddressName())
                .isDefault(dto.isDefault() || isFirstAddress)
                .build();

        return addressRepository.save(address);
    }

    @Override
    @Transactional
    public List<AddressDto> setDefaultAddress(long addressId) {
        Member member = getLoginMember();
        Long memberId = member.getMemberId();

        List<Address> addresses = addressRepository.findByMember_MemberId(memberId);

        addresses.forEach(addr -> addr.setDefault(false));

        Address target = addresses.stream()
                .filter(a -> a.getAddressId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("해당 주소 없음"));

        target.setDefault(true);
       return addresses.stream()
               .map(AddressDto::new)
               .toList();
    }

    @Override
    @Transactional
    public List<AddressDto> getAddressList(Long memberId) {
        return addressRepository.findByMember_MemberId(memberId)
                .stream()
                .map(AddressDto::new)
                .toList();
    }

    @Override
    @Transactional
    public List<AddressDto> deleteAddress(long addressId) {

        Member member = getLoginMember();

        //삭제 대상 조회
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("해당 주소 없음"));

        //본인 주소인지?
        if (!address.getMember().getMemberId().equals(member.getMemberId())) {
            throw new RuntimeException("삭제 권한 없음");
        }

        //기본 배송지 삭제 불가
        if (address.isDefault()) {
            throw new RuntimeException("기본 배송지는 삭제할 수 없습니다.");
        }

        //삭제
        addressRepository.delete(address);

        List<Address> updated = addressRepository.findByMember_MemberId(member.getMemberId());
        return updated.stream().map(AddressDto::new).toList();
    }
}
