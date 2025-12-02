package com.bookshop.Controller;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Member;
import com.bookshop.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {
    private final AddressService addressService;

    @PostMapping
    public String createAddress(@RequestBody AddressDto dto) {

        addressService.createAddress(dto);
        return "OK";
    }
    @PostMapping("/list")
    public List<AddressDto> getAddress() {
        return addressService.getAddressList();
    }
}
