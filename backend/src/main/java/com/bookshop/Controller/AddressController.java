package com.bookshop.Controller;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Member;
import com.bookshop.repository.MemberRepository;
import com.bookshop.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {
    private final AddressService addressService;
    private final MemberRepository memberRepository;

    private Member getLoginMember() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        return memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));
    }

    @PostMapping("/create")
    public List<AddressDto> createAddress(@RequestBody AddressDto dto) {
        addressService.createAddress(dto);
        Member member = getLoginMember();
        return addressService.getAddressList(member.getMemberId());
    }

    @PostMapping("set-default")
    public List<AddressDto> setDefaultAddress(@RequestBody AddressDto dto) {
        return addressService.setDefaultAddress(dto.getAddressId());
    }

    @GetMapping("/get")
    public List<AddressDto> getAddressList() {
        Member member = getLoginMember();
        return addressService.getAddressList(member.getMemberId());
    }

    @PostMapping("/delete")
    public List<AddressDto> deleteAddress(@RequestBody AddressDto dto) {
        return addressService.deleteAddress(dto.getAddressId());
    }
}
