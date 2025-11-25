package com.bookshop.Controller;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.CartItemDto;
import com.bookshop.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
  CartController
  - 장바구니 관련 API 제공
  - 기존 /cart/checkout은 팀원 코드 유지
  - 새로 /cart/add API 추가
*/
@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ==========================
    //  기존 팀원 코드
    // ==========================
    @PostMapping("/checkout")
    public List<BookDetailDto> cartToPayment(@RequestBody List<CartItemDto> cartItems) {
        return cartService.cartToPayment(cartItems);
    }

    // ==========================
    //  새로운 장바구니 추가 API
    // ==========================
    @PostMapping("/add")
    public String addToCart(@RequestBody CartItemDto cartItemDto) {
        try {
            cartService.addCartItem(cartItemDto.getMemberId(), cartItemDto.getBookId(), cartItemDto.getQuatity());
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }
}
