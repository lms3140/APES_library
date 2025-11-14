package com.bookshop.service;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.CartItemDto;

import java.util.List;

public interface CartService {
    List<BookDetailDto> cartToPayment(List<CartItemDto> cartItems);
}
