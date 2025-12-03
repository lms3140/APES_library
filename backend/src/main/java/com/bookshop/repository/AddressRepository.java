package com.bookshop.repository;

import com.bookshop.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByMember_MemberId(Long memberId);
}
