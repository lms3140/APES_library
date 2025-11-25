package com.bookshop.Controller;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.CartItemDto;
import com.bookshop.service.CartService;
import org.hibernate.query.NativeQuery;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

//장바구니 내용물 전달
@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/checkout")
    public List<BookDetailDto> cartToPayment(@RequestBody List<CartItemDto> cartItems){
        return cartService.cartToPayment(cartItems);
    }
}
