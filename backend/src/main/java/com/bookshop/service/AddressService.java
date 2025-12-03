package com.bookshop.service;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Address;
import com.bookshop.entity.Member;

import java.util.List;

public interface AddressService {
    Address createAddress(AddressDto dto);
    List<AddressDto> setDefaultAddress(long addressId);
    List<AddressDto> getAddressList(Long memberId);
    List<AddressDto> deleteAddress(long addressId);
}
