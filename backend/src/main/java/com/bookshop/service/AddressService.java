package com.bookshop.service;

import com.bookshop.dto.AddressDto;
import com.bookshop.entity.Address;
import com.bookshop.entity.Member;

public interface AddressService {
    Address createAddress(AddressDto dto);
}
